describe("SelectorController", function() {

    describe("exactMatchFilter", function() {

        it("should returns false if less than two critera selected", function() {
            var scope = {};
            var card = {
                name: 'PP Standart',
                isPP: true,
                cardValue: 'standard',
                graphicCustomization: 'none',
                deliveryTime: 1
            };
            
            SelectorController(scope);
            
            scope.criteria.cardValue = 'standard';

            expect(scope.exactMatchFilter(card)).toBe(false);
        });

        it("should returns true if more than two critera match", function() {
            var scope = {};
            var card = {
                name: 'PP Standart',
                isPP: true,
                cardValue: 'standard',
                graphicCustomization: 'none',
                deliveryTime: 1
            };
            
            SelectorController(scope);
            
            scope.criteria.cardValue = 'standard';
            scope.criteria.graphicCustomization = 'none';

            expect(scope.exactMatchFilter(card)).toBe(true);
        });
        
        it("should returns false if more than two critera match, but card is not PP", function() {
            var scope = {};
            var card = {
                name: 'PP Standart',
                isPP: false,
                cardValue: 'standard',
                graphicCustomization: 'none',
                deliveryTime: 1
            };
            
            SelectorController(scope);
            
            scope.criteria.cardValue = 'standard';
            scope.criteria.graphicCustomization = 'none';

            expect(scope.exactMatchFilter(card)).toBe(false);
        });

    });
});

