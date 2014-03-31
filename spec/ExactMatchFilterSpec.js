
describe("Exact Match Filter", function() {

    var scope;
    beforeEach(function() {
        scope = {};
        SelectorController(scope);
    });

    it("should returns false if less than two critera selected", function() {
        var card = {
            isPP: true,
            cardValue: 'standard',
            graphicCustomization: 'none',
            deliveryTime: 1
        };

        scope.criteria.cardValue = 'standard';

        expect(scope.exactMatchFilter(card)).toBe(false);
    });

    it("should returns true if more than two critera match", function() {
        var card = {
            isPP: true,
            cardValue: 'standard',
            graphicCustomization: 'none',
            deliveryTime: 1
        };

        scope.criteria.cardValue = 'standard';
        scope.criteria.graphicCustomization = 'none';

        expect(scope.exactMatchFilter(card)).toBe(true);
    });

    it("should returns false if critera match, but card is not PP", function() {
        var card = {
            isPP: false,
            cardValue: 'standard',
            graphicCustomization: 'none',
            deliveryTime: 1
        };

        scope.criteria.cardValue = 'standard';
        scope.criteria.graphicCustomization = 'none';

        expect(scope.exactMatchFilter(card)).toBe(false);
    });

    it("should return true if all three criteria match", function() {
        var card = {
            isPP: true,
            cardValue: 'standard',
            graphicCustomization: 'none',
            deliveryTime: 1
        };

        scope.criteria.cardValue = 'standard';
        scope.criteria.graphicCustomization = 'none';
        scope.criteria.deliveryTime = 1;

        expect(scope.exactMatchFilter(card)).toBe(true);
    });

    it("should return false if all three criteria selected but one doesnt match", function() {
        var card = {
            isPP: true,
            cardValue: 'standard',
            graphicCustomization: 'none',
            deliveryTime: 1
        };

        scope.criteria.cardValue = 'standard';
        scope.criteria.graphicCustomization = 'full';
        scope.criteria.deliveryTime = 1;

        expect(scope.exactMatchFilter(card)).toBe(false);
    });


});

