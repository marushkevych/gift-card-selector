function SelectorController($scope){
    
    $scope.criteria = {
        cardValue: null,
        graphicCustomization: null,
        deliveryTime: null
    }
    
    $scope.exactMatchFilter = function(card){
        return matchCardValue(card) && matchGraphicCustomization(card) && matchDeliveryTime(card);
    };
    
    function matchCardValue(card){
        if('standardAndVariable' === card.cardValue || $scope.criteria.cardValue == null) return true;
        return card.cardValue === $scope.criteria.cardValue;
    }
    
    function matchGraphicCustomization(card){
        if( $scope.criteria.graphicCustomization == null) return true;
        return card.graphicCustomization === $scope.criteria.graphicCustomization;
    }

    function matchDeliveryTime(card){
        if( $scope.criteria.deliveryTime == null) return true;
        return card.deliveryTime <= $scope.criteria.deliveryTime;
    }
    
    $scope.closestMatchFilter = function(card){
        return false;
    };
    
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
