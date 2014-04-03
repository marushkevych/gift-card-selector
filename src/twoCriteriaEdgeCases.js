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

