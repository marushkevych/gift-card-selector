describe("Exact Match Filter", function() {

    beforeEach(angular.mock.module('gift-card-selector'));

    var scope;
    beforeEach(inject(function($controller) {
        scope = {};
        $controller("SelectorController", {$scope: scope});
    }));

    it("should block if less than two criteria selected", function() {
        var card = {
            isPP: true,
            cardValue: 'standard',
            graphicCustomization: 'none',
            deliveryTime: 1
        };

        scope.criteria.cardValue = 'standard';

        expect(scope.exactMatchFilter(card)).toBe(false);
    });

    it("should pass if more than two criteria match", function() {
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

    it("should block if criteria match, but card is not PP", function() {
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

    it("should pass if all three criteria match", function() {
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

    it("should block if all three criteria selected but one doesnt match", function() {
        var card = {
            isPP: true,
            cardValue: 'standardAndVariable',
            graphicCustomization: 'full',
            deliveryTime: 30
        };

        scope.criteria.cardValue = 'standard';
        scope.criteria.graphicCustomization = 'none';
        scope.criteria.deliveryTime = 1;

        expect(scope.exactMatchFilter(card)).toBe(false);
    });


});

