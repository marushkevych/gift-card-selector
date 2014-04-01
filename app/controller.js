function SelectorController($scope) {

    $scope.cards = esi.cards;
    
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
        
        // edge case 'partial custom, next day'
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
        // edge case 'full custom, next day'
        if ($scope.criteria.graphicCustomization === 'full' && $scope.criteria.deliveryTime === 1) {
            if (card.graphicCustomization === 'full' && card.deliveryTime === 30) {
                return true;
            }
            if (card.cardValue === 'standard' && card.deliveryTime === 1) {
                return true;
            }
            if (card.cardValue === 'variable' && card.deliveryTime === 1) {
                return true;
            }
        }
        // edge case 'full custom, next day'
        if ($scope.criteria.graphicCustomization === 'full' && $scope.criteria.deliveryTime === 5) {
            if (card.graphicCustomization === 'partial' && card.deliveryTime === 5) {
                return true;
            }            
            if (card.graphicCustomization === 'full' && card.deliveryTime === 30) {
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


    
}
