var module = angular.module('gift-card-selector',[]);

var composeFilters = require('./utils/composeFilters');

module.controller('SelectorController', ['$scope', function($scope) {
    
    var criteria = {
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
    
    var twoCriteriaEdgeCases = require("./twoCriteriaEdgeCases")(criteria);
    var threeCriteriaExactMatchEdgeCases = require("./threeCriteriaExactMatchEdgeCases")(criteria);
    var threeCriteriaClosestMatchEdgeCases = require("./threeCriteriaClosestMatchEdgeCases")(criteria);

    $scope.cards = esi.cards;
    $scope.criteria  = criteria;
    
    /**
     * Returns true if cards is PP and criteria match (ecxcept edge cases)
     * 
     * @returns {Boolean} 
     */
    $scope.exactMatchFilter = function(card) {
        if (criteria.count() < 2 || !card.isPP) {
            return false;
        }

        // criteria count is 2
        if (criteria.count() === 2) {
            return composeFilters(twoCriteriaEdgeCases, cardMatchFilter)(card);
        }

        // criteria count is 3
        return composeFilters(threeCriteriaExactMatchEdgeCases, cardMatchFilter)(card);
    };

    /**
     * If criteria count is 2:
     *      Returns true if cards is not PP and criteria match (ecxcept edge cases)
     *      
     * If criteria count is 3:
     *      If card is PP 
     *          Returns true if exaclty two criteria match (ecxcept edge cases)
     *      If card is not PP 
     *          Returns true if at least two criteria match (ecxcept edge cases)
     * 
     * @returns {Boolean} 
     */
    $scope.closestMatchFilter = function(card) {
        if (criteria.count() < 2) {
            return false;
        }

        // criteria count is 2
        if (criteria.count() === 2) {
            if (card.isPP) {
                return false;
            }
            return composeFilters(twoCriteriaEdgeCases, cardMatchFilter)(card);
        }

        // criteria count is 3
        return composeFilters(threeCriteriaClosestMatchEdgeCases, threeCriteriaClosestMatchFilter)(card);

    };
    
    function cardMatchFilter(card){
        return matchCardValue(card) && matchGraphicCustomization(card) && matchDeliveryTime(card);
    }
    
    function threeCriteriaClosestMatchFilter(card){
        
        var matchCount = getMatchCount(card);

        if (!card.isPP) {
            return  matchCount > 1;
        } else {
            return  matchCount === 2;
        }         
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
        if ('standardAndVariable' === card.cardValue || criteria.cardValue == null)
            return true;
        return card.cardValue === criteria.cardValue;
    }

    function matchGraphicCustomization(card) {
        if (criteria.graphicCustomization == null)
            return true;
        return card.graphicCustomization === criteria.graphicCustomization;
    }

    function matchDeliveryTime(card) {
        if (criteria.deliveryTime == null)
            return true;
        return card.deliveryTime <= criteria.deliveryTime;
    }

}]);
