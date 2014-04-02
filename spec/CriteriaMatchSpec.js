
describe("Card", function() {

    beforeEach(angular.mock.module('gift-card-selector'));

    var scope;
    beforeEach(inject(function($controller) {
        scope = {};
        $controller("SelectorController", {$scope: scope});
    }));

    describe("deliveryTime", function() {
        var card = {
            isPP: true,
            cardValue: 'standard',
            graphicCustomization: 'full'
        };
        beforeEach(function() {
            scope.criteria.cardValue = 'standard';
            scope.criteria.graphicCustomization = 'full';
        });

        it("should match if criteria deliveryTime is longer", function() {
            card.deliveryTime = 5;
            scope.criteria.deliveryTime = 30;
            expect(scope.exactMatchFilter(card)).toBe(true);
        });
        
        it("should match if criteria deliveryTime is same", function() {
            card.deliveryTime = 5;
            scope.criteria.deliveryTime = 5;
            expect(scope.exactMatchFilter(card)).toBe(true);
        });
        
        it("should not match if criteria deliveryTime is less", function() {
            card.deliveryTime = 5;
            scope.criteria.deliveryTime = 1;
            expect(scope.exactMatchFilter(card)).toBe(false);
        });
    });

    describe("cardValue", function() {
        var card = {
            isPP: true,
            deliveryTime: 5,
            graphicCustomization: 'full'
        };
        beforeEach(function() {
            scope.criteria.deliveryTime = 5;
            scope.criteria.graphicCustomization = 'full';
        });

        it("standardAndVariable should match if criteria is standart", function() {
            card.cardValue = 'standardAndVariable';
            scope.criteria.cardValue = 'standard';
            expect(scope.exactMatchFilter(card)).toBe(true);
        });
        
        it("standardAndVariable should match if criteria is variable", function() {
            card.cardValue = 'standardAndVariable';
            scope.criteria.cardValue = 'variable';
            expect(scope.exactMatchFilter(card)).toBe(true);
        });
        
        it("standart should not match if criteria is variable", function() {
            card.cardValue = 'standart';
            scope.criteria.cardValue = 'variable';
            expect(scope.exactMatchFilter(card)).toBe(false);
        });
        
        it("variable should not match if criteria is standart", function() {
            card.cardValue = 'variable';
            scope.criteria.cardValue = 'standart';
            expect(scope.exactMatchFilter(card)).toBe(false);
        });
        
    });



});

