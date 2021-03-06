;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./threeCriteriaClosestMatchEdgeCases":2,"./threeCriteriaExactMatchEdgeCases":3,"./twoCriteriaEdgeCases":4,"./utils/composeFilters":5}],2:[function(require,module,exports){
module.exports = function(criteria){
    return function (card){
        // edge cases
        
        // edge case 'standard, partial, next day'
        if (criteria.cardValue === 'standard'
                && criteria.graphicCustomization === 'partial' 
                && criteria.deliveryTime === 1) {
            
            if (card.isPP && card.graphicCustomization === 'partial' && card.deliveryTime === 5) {
                return false;
            }
            
            if (card.isPP && card.cardValue === 'standard' && card.deliveryTime === 1) {
                return false;
            }            
        }
        
        // edge case 'standard, custom, next day'
        if (criteria.cardValue === 'standard'
                && criteria.graphicCustomization === 'full' 
                && criteria.deliveryTime === 1) {
            
            if (card.isPP && card.graphicCustomization === 'full' && card.deliveryTime === 30) {
                return false;
            }
            if (card.isPP && card.cardValue === 'standard' && card.deliveryTime === 1) {
                return false;
            }            
        }          
        
        // edge case 'standard, custom, 5 days'
        if (criteria.cardValue === 'standard'
                && criteria.graphicCustomization === 'full' 
                && criteria.deliveryTime === 5) {
            
            if (card.isPP && card.graphicCustomization === 'full' && card.deliveryTime === 30) {
                return false;
            }
            
            if (card.isPP && card.graphicCustomization === 'partial' && card.deliveryTime === 5) {
                return false;
            }            
        }          
        
        // edge case 'variable, partial, next day'
        if (criteria.cardValue === 'variable'
                && criteria.graphicCustomization === 'partial' 
                && criteria.deliveryTime === 1) {
            
            if (card.isPP && card.graphicCustomization === 'partial' && card.deliveryTime === 5) {
                return false;
            }
            
            if (card.isPP && card.cardValue === 'variable' && card.deliveryTime === 1) {
                return false;
            }            
        }         
        
        // edge case 'variable, full, next day'
        if (criteria.cardValue === 'variable'
                && criteria.graphicCustomization === 'full' 
                && criteria.deliveryTime === 1) {
            
            if (card.isPP && card.graphicCustomization === 'full' && card.deliveryTime === 30) {
                return false;
            }

            if (card.isPP && card.cardValue === 'variable' && card.deliveryTime === 1) {
                return false;
            }            
        }          
        
        // edge case 'variable, full, 5 days'
        if (criteria.cardValue === 'variable'
                && criteria.graphicCustomization === 'full' 
                && criteria.deliveryTime === 5) {
            
            if (card.isPP && card.graphicCustomization === 'full' && card.deliveryTime === 30) {
                return false;
            }

            if (card.isPP && card.graphicCustomization === 'partial' && card.deliveryTime === 5) {
                return false;
            }            
        }        
       
    };
};



},{}],3:[function(require,module,exports){

module.exports = function(criteria){
        
    return function(card){
        // edge case 'standard, partial, next day'
        if (criteria.cardValue === 'standard'
                && criteria.graphicCustomization === 'partial' 
                && criteria.deliveryTime === 1) {
            
            if (card.graphicCustomization === 'partial' && card.deliveryTime === 5) {
                return true;
            }
            
            if (card.cardValue === 'standard' && card.deliveryTime === 1) {
                return true;
            }
        }      
        
        // edge case 'standard, custom, next day'
        if (criteria.cardValue === 'standard'
                && criteria.graphicCustomization === 'full' 
                && criteria.deliveryTime === 1) {
            
            if (card.graphicCustomization === 'full' && card.deliveryTime === 30) {
                return true;
            }
            if (card.cardValue === 'standard' && card.deliveryTime === 1) {
                return true;
            }
        }    
        
        // edge case 'standard, custom, 5 days'
        if (criteria.cardValue === 'standard'
                && criteria.graphicCustomization === 'full' 
                && criteria.deliveryTime === 5) {
            
            if (card.graphicCustomization === 'full' && card.deliveryTime === 30) {
                return true;
            }
            
            if (card.graphicCustomization === 'partial' && card.deliveryTime === 5) {
                return true;
            }            
        }        
        
        // edge case 'variable, partial, next day'
        if (criteria.cardValue === 'variable'
                && criteria.graphicCustomization === 'partial' 
                && criteria.deliveryTime === 1) {
            
            if (card.graphicCustomization === 'partial' && card.deliveryTime === 5) {
                return true;
            }
            
            if (card.cardValue === 'variable' && card.deliveryTime === 1) {
                return true;
            }
            
        }        
        
        // edge case 'variable, full, next day'
        if (criteria.cardValue === 'variable'
                && criteria.graphicCustomization === 'full' 
                && criteria.deliveryTime === 1) {
            
            if (card.graphicCustomization === 'full' && card.deliveryTime === 30) {
                return true;
            }
            
            if (card.cardValue === 'variable' && card.deliveryTime === 1) {
                return true;
            }
        }        

        // edge case 'variable, full, 5 days'
        if (criteria.cardValue === 'variable'
                && criteria.graphicCustomization === 'full' 
                && criteria.deliveryTime === 5) {
            
            if (card.graphicCustomization === 'full' && card.deliveryTime === 30) {
                return true;
            }
            
            if (card.graphicCustomization === 'partial' && card.deliveryTime === 5) {
                return true;
            }
        }        
        
    };
};

},{}],4:[function(require,module,exports){
/**
 * These Edge cases apply to both exact match and closest match
 */
module.exports = function(criteria) {
    return function(card){
        // edge case 'partial, next day'
        if (criteria.graphicCustomization === 'partial' && criteria.deliveryTime === 1) {
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
        // edge case 'full, next day'
        if (criteria.graphicCustomization === 'full' && criteria.deliveryTime === 1) {
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
        // edge case 'full, next day'
        if (criteria.graphicCustomization === 'full' && criteria.deliveryTime === 5) {
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
    };
};


},{}],5:[function(require,module,exports){
module.exports = composeFilters;

/**
 * Compose filer function with edge case functions
 * Filter function should be last argument.
 * 
 * Edge case function can return true false or undefined. 
 * If edge case returns true of false, that becames the reuslt of compose function.
 * 
 * @returns {Function}
 */
function composeFilters(){
    var args = Array.prototype.slice.call(arguments, 0);
    return function(value){
        for(var i = 0; i < args.length; i++){
            var result = args[i](value);
            if(result !== undefined){
                return result;
            }
        }
    };
}


},{}]},{},[1,2,3,4,5])
;