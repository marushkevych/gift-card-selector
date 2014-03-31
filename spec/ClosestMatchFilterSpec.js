
describe("Closest Match Filter", function() {

    var scope;
    beforeEach(function() {
        scope = {};
        SelectorController(scope);
    });

    it("should return false if card is not PP and less than two critera selected", function() {
        var card = {
            isPP: false,
            cardValue: 'standard',
            graphicCustomization: 'none',
            deliveryTime: 1
        };

        scope.criteria.cardValue = 'standard';

        expect(scope.criteria.count()).toBe(1);
        expect(scope.closestMatchFilter(card)).toBe(false);
    });

    describe('when criteria count is 2', function() {
        beforeEach(function() {
            scope.criteria.cardValue = 'standard';
            scope.criteria.graphicCustomization = 'none';
        });

        it('should return true if criteria match and card is not PP', function() {
            expect(scope.criteria.count()).toBe(2);
            var card = {
                isPP: false,
                cardValue: 'standard',
                graphicCustomization: 'none',
                deliveryTime: 1
            };
            expect(scope.closestMatchFilter(card)).toBe(true);
        });

        it('should return false if criteria match and card is PP', function() {
            expect(scope.criteria.count()).toBe(2);
            var card = {
                isPP: true,
                cardValue: 'standard',
                graphicCustomization: 'none',
                deliveryTime: 1
            };
            expect(scope.closestMatchFilter(card)).toBe(false);
        });

    });



});

