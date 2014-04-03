
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
