describe("Closest Match Filter", function() {
    
    beforeEach(angular.mock.module('gift-card-selector'));

    var scope;
    beforeEach(inject(function($controller) {
        scope = {};
        $controller("SelectorController", {$scope: scope});
    }));


    it("should block if card is not PP and less than two criteria selected", function() {
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

        it('should pass if criteria match and card is not PP', function() {
            expect(scope.criteria.count()).toBe(2);
            var card = {
                isPP: false,
                cardValue: 'standard',
                graphicCustomization: 'none',
                deliveryTime: 1
            };
            expect(scope.closestMatchFilter(card)).toBe(true);
        });

        it('should block if criteria match and card is PP', function() {
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

    describe('when criteria count is 3', function() {
        beforeEach(function() {
            scope.criteria.cardValue = 'standard';
            scope.criteria.graphicCustomization = 'none';
            scope.criteria.deliveryTime = 1;
        });

        describe('and card is not PP', function() {

            it('should pass if all criteria match', function() {
                expect(scope.criteria.count()).toBe(3);
                var card = {
                    isPP: false,
                    cardValue: 'standard',
                    graphicCustomization: 'none',
                    deliveryTime: 1
                };
                expect(scope.closestMatchFilter(card)).toBe(true);
            });

            it('should pass if at least two criteria match', function() {
                expect(scope.criteria.count()).toBe(3);
                var card = {
                    isPP: false,
                    cardValue: 'standard',
                    graphicCustomization: 'none',
                    deliveryTime: 5
                };
                expect(scope.closestMatchFilter(card)).toBe(true);
            });

            it('should block if only one criteria match', function() {
                expect(scope.criteria.count()).toBe(3);
                var card = {
                    isPP: false,
                    cardValue: 'standard',
                    graphicCustomization: 'full',
                    deliveryTime: 5
                };
                expect(scope.closestMatchFilter(card)).toBe(false);
            });
        });

        describe('and card is PP', function() {

            it('should block if all three criteria match', function() {
                expect(scope.criteria.count()).toBe(3);
                var card = {
                    isPP: true,
                    cardValue: 'standard',
                    graphicCustomization: 'none',
                    deliveryTime: 1
                };
                expect(scope.closestMatchFilter(card)).toBe(false);
            });

            it('should pass if exactly two criteria match', function() {
                expect(scope.criteria.count()).toBe(3);
                var card = {
                    isPP: true,
                    cardValue: 'standard',
                    graphicCustomization: 'none',
                    deliveryTime: 5
                };
                expect(scope.closestMatchFilter(card)).toBe(true);
            });

            it('should block if only one criteria match', function() {
                expect(scope.criteria.count()).toBe(3);
                var card = {
                    isPP: true,
                    cardValue: 'standard',
                    graphicCustomization: 'full',
                    deliveryTime: 5
                };
                expect(scope.closestMatchFilter(card)).toBe(false);
            });

        });



    });



});

