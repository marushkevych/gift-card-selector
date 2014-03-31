function SelectorController($scope) {

    $scope.criteria = {
        cardValue: null,
        graphicCustomization: null,
        deliveryTime: null,
        /**
         * @returns {Number} count of selected criteria (0-3)
         */
        count: function() {
            var count = 0;
            if (this.cardValue)
                count += 1;
            if (this.graphicCustomization)
                count += 1;
            if (this.deliveryTime)
                count += 1;
            return count;
        }
    };

    $scope.exactMatchFilter = function(card) {
        if ($scope.criteria.count() < 2 || !card.isPP) {
            return false;
        }

        // criteria count is 2
        if ($scope.criteria.count() === 2) {
            return twoCriteriaFilter(card);
        }

        // criteria count is 3
        return matchCardValue(card) && matchGraphicCustomization(card) && matchDeliveryTime(card);
    };

    $scope.closestMatchFilter = function(card) {
        if ($scope.criteria.count() < 2) {
            return false;
        }

        // criteria count is 2
        if ($scope.criteria.count() === 2) {
            if (card.isPP) {
                return false;
            }
            return twoCriteriaFilter(card);
        }

        // criteria count is 3
        var matchCount = getMatchCount(card);

        if (!card.isPP) {
            return  matchCount > 1;
        } else {
            return  matchCount === 2;
        }

    };

    function twoCriteriaFilter(card) {
        // edge cases
        
        // edge case 'partial, next day'
        if ($scope.criteria.graphicCustomization === 'partial' && $scope.criteria.deliveryTime === 1) {
            if (card.graphicCustomization === 'partial' && card.deliveryTime === 5) {
                return true;
            }
            if (card.cardValue === 'standard' && card.deliveryTime === 1) {
                return true;
            }
            if (card.cardValue === 'variable' && card.deliveryTime === 1) {
                return true;
            }
        }

        // regular cases
        return matchCardValue(card) && matchGraphicCustomization(card) && matchDeliveryTime(card);
    }

    function getMatchCount(card) {
        var matchCount = 0;
        if (matchCardValue(card))
            matchCount += 1;
        if (matchGraphicCustomization(card))
            matchCount += 1;
        if (matchDeliveryTime(card))
            matchCount += 1;

        return matchCount;
    }

    function matchCardValue(card) {
        if ('standardAndVariable' === card.cardValue || $scope.criteria.cardValue == null)
            return true;
        return card.cardValue === $scope.criteria.cardValue;
    }

    function matchGraphicCustomization(card) {
        if ($scope.criteria.graphicCustomization == null)
            return true;
        return card.graphicCustomization === $scope.criteria.graphicCustomization;
    }

    function matchDeliveryTime(card) {
        if ($scope.criteria.deliveryTime == null)
            return true;
        return card.deliveryTime <= $scope.criteria.deliveryTime;
    }


    /**
     * Cards configuration. Use following values:
     * 
     * cardValue: standard, variable, standardAndVariable
     * 
     * graphicCustomization: full, partial, none
     * 
     * deliveryTime: 1, 5, 30
     * 
     */
    $scope.cards = [
        // PP red
        {
            name: 'PP Standart',
            isPP: true,
            cardValue: 'standard',
            graphicCustomization: 'none',
            deliveryTime: 1
        },
        // GC red
        {
            name: 'GC Standart',
            isPP: false,
            cardValue: 'standard',
            graphicCustomization: 'none',
            deliveryTime: 1
        },
        // PP yellow
        {
            name: 'PP Partial Custom',
            isPP: true,
            cardValue: 'standardAndVariable',
            graphicCustomization: 'partial',
            deliveryTime: 5
        },
        // GC yellow
        {
            name: 'GC Partial Custom',
            isPP: false,
            cardValue: 'standardAndVariable',
            graphicCustomization: 'partial',
            deliveryTime: 5
        },
        // PP green
        {
            name: 'PP Full Custom',
            isPP: true,
            cardValue: 'standardAndVariable',
            graphicCustomization: 'full',
            deliveryTime: 30
        },
        // GC green
        {
            name: 'GC Full Custom',
            isPP: false,
            cardValue: 'standardAndVariable',
            graphicCustomization: 'full',
            deliveryTime: 30
        },
        // PP blue
        {
            name: 'PP Variable Card',
            isPP: true,
            cardValue: 'variable',
            graphicCustomization: 'none',
            deliveryTime: 1
        },
        // GC blue
        {
            name: 'GC Variable Card',
            isPP: false,
            cardValue: 'variable',
            graphicCustomization: 'none',
            deliveryTime: 1
        }
    ];
}
