
describe('Edge Cases when three criteria selected', function() {

    beforeEach(angular.mock.module('gift-card-selector'));

    var scope;
    beforeEach(inject(function($controller) {
        scope = {};
        $controller("SelectorController", {$scope: scope});
    }));

    describe('edge case "standard, partial, next day"', function() {
        beforeEach(function() {
            scope.criteria.cardValue = 'standard';
            scope.criteria.graphicCustomization = 'partial';
            scope.criteria.deliveryTime = 1;
        });

        describe('exactMatchFilter', function() {

            it('should pass if card is PP, Partial, 5 days', function() {
                expect(scope.criteria.count()).toBe(3);
                var card = {
                    isPP: true,
                    cardValue: 'standardAndVariable',
                    graphicCustomization: 'partial',
                    deliveryTime: 5
                };
                expect(scope.exactMatchFilter(card)).toBe(true);
            });

            it('should pass if card is PP, standart, next day', function() {
                expect(scope.criteria.count()).toBe(3);
                var card = {
                    isPP: true,
                    cardValue: 'standard',
                    graphicCustomization: 'whatever',
                    deliveryTime: 1
                };
                expect(scope.exactMatchFilter(card)).toBe(true);
            });

        });

        describe('closestMatchFilter', function() {

            it('should block if card is PP, Partial, 5 days', function() {
                expect(scope.criteria.count()).toBe(3);
                var card = {
                    isPP: true,
                    cardValue: 'standardAndVariable',
                    graphicCustomization: 'partial',
                    deliveryTime: 5
                };
                expect(scope.closestMatchFilter(card)).toBe(false);
            });

            it('should block if card is PP, standart, next day', function() {
                expect(scope.criteria.count()).toBe(3);
                var card = {
                    isPP: true,
                    cardValue: 'standard',
                    graphicCustomization: 'whatever',
                    deliveryTime: 1
                };
                expect(scope.closestMatchFilter(card)).toBe(false);
            });
        });

       
    });
    
    describe('edge case "standard, custom, next day"', function() {
        beforeEach(function() {
            scope.criteria.cardValue = 'standard';
            scope.criteria.graphicCustomization = 'full';
            scope.criteria.deliveryTime = 1;
        });

        describe('exactMatchFilter', function() {

            it('should pass if card is PP, Full, 30 days', function() {
                expect(scope.criteria.count()).toBe(3);
                var card = {
                    isPP: true,
                    cardValue: 'standardAndVariable',
                    graphicCustomization: 'full',
                    deliveryTime: 30
                };
                expect(scope.exactMatchFilter(card)).toBe(true);
            });

            it('should pass if card is PP, standard, next day', function() {
                expect(scope.criteria.count()).toBe(3);
                var card = {
                    isPP: true,
                    cardValue: 'standard',
                    graphicCustomization: 'whatever',
                    deliveryTime: 1
                };
                expect(scope.exactMatchFilter(card)).toBe(true);
            });



        });

        describe('closestMatchFilter', function() {

            it('should block if card is PP, Full, 30 days', function() {
                expect(scope.criteria.count()).toBe(3);
                var card = {
                    isPP: true,
                    cardValue: 'standardAndVariable',
                    graphicCustomization: 'full',
                    deliveryTime: 30
                };
                expect(scope.closestMatchFilter(card)).toBe(false);
            });


            it('should block if card is PP, standard, next day', function() {
                expect(scope.criteria.count()).toBe(3);
                var card = {
                    isPP: true,
                    cardValue: 'standard',
                    graphicCustomization: 'whatever',
                    deliveryTime: 1
                };
                expect(scope.closestMatchFilter(card)).toBe(false);
            });
        });

       
    });

    describe('edge case "standard, custom, 5 days"', function() {
        beforeEach(function() {
            scope.criteria.cardValue = 'standard';
            scope.criteria.graphicCustomization = 'full';
            scope.criteria.deliveryTime = 5;
        });

        describe('exactMatchFilter', function() {

            it('should pass if card is PP, Full, 30 days', function() {
                expect(scope.criteria.count()).toBe(3);
                var card = {
                    isPP: true,
                    cardValue: 'standardAndVariable',
                    graphicCustomization: 'full',
                    deliveryTime: 30
                };
                expect(scope.exactMatchFilter(card)).toBe(true);
            });
                   
            it('should pass if card is PP, Partial, 5 days', function() {
                expect(scope.criteria.count()).toBe(3);
                var card = {
                    isPP: true,
                    cardValue: 'standardAndVariable',
                    graphicCustomization: 'partial',
                    deliveryTime: 5
                };
                expect(scope.exactMatchFilter(card)).toBe(true);
            });                   
        });

        describe('closestMatchFilter', function() {

            it('should block if card is PP, Full, 30 days', function() {
                expect(scope.criteria.count()).toBe(3);
                var card = {
                    isPP: true,
                    cardValue: 'standardAndVariable',
                    graphicCustomization: 'full',
                    deliveryTime: 30
                };
                expect(scope.closestMatchFilter(card)).toBe(false);
            });
            
            it('should block if card is PP, Partial, 5 days', function() {
                expect(scope.criteria.count()).toBe(3);
                var card = {
                    isPP: true,
                    cardValue: 'standardAndVariable',
                    graphicCustomization: 'partial',
                    deliveryTime: 5
                };
                expect(scope.closestMatchFilter(card)).toBe(false);
            });            
        });
    });

    describe('edge case "variable, partial, next day"', function() {
        beforeEach(function() {
            scope.criteria.cardValue = 'variable';
            scope.criteria.graphicCustomization = 'partial';
            scope.criteria.deliveryTime = 1;
        });

        describe('exactMatchFilter', function() {

            it('should pass if card is PP, partial, 5 days', function() {
                expect(scope.criteria.count()).toBe(3);
                var card = {
                    isPP: true,
                    cardValue: 'standardAndVariable',
                    graphicCustomization: 'partial',
                    deliveryTime: 5
                };
                expect(scope.exactMatchFilter(card)).toBe(true);
            });
            
            it('should pass if card is PP, variable, next day', function() {
                expect(scope.criteria.count()).toBe(3);
                var card = {
                    isPP: true,
                    cardValue: 'variable',
                    graphicCustomization: 'whatever',
                    deliveryTime: 1
                };
                expect(scope.exactMatchFilter(card)).toBe(true);
            });            
        });

        describe('closestMatchFilter', function() {

            it('should block if card is PP, partial, 5 days', function() {
                expect(scope.criteria.count()).toBe(3);
                var card = {
                    isPP: true,
                    cardValue: 'standardAndVariable',
                    graphicCustomization: 'partial',
                    deliveryTime: 5
                };
                expect(scope.closestMatchFilter(card)).toBe(false);
            });       
            
            it('should block if card is PP, variable, next day', function() {
                expect(scope.criteria.count()).toBe(3);
                var card = {
                    isPP: true,
                    cardValue: 'variable',
                    graphicCustomization: 'whatever',
                    deliveryTime: 1
                };
                expect(scope.closestMatchFilter(card)).toBe(false);
            });            
        });
    });

    describe('edge case "variable, full, next day"', function() {
        beforeEach(function() {
            scope.criteria.cardValue = 'variable';
            scope.criteria.graphicCustomization = 'full';
            scope.criteria.deliveryTime = 1;
        });

        describe('exactMatchFilter', function() {

            it('should pass if card is PP, full, 30 days', function() {
                expect(scope.criteria.count()).toBe(3);
                var card = {
                    isPP: true,
                    cardValue: 'standardAndVariable',
                    graphicCustomization: 'full',
                    deliveryTime: 30
                };
                expect(scope.exactMatchFilter(card)).toBe(true);
            });

            it('should pass if card is PP, variable, next day', function() {
                expect(scope.criteria.count()).toBe(3);
                var card = {
                    isPP: true,
                    cardValue: 'variable',
                    graphicCustomization: 'whatever',
                    deliveryTime: 1
                };
                expect(scope.exactMatchFilter(card)).toBe(true);
            });
           
        });

        describe('closestMatchFilter', function() {
           
            it('should block if card is PP, full, 30 days', function() {
                expect(scope.criteria.count()).toBe(3);
                var card = {
                    isPP: true,
                    cardValue: 'standardAndVariable',
                    graphicCustomization: 'full',
                    deliveryTime: 30
                };
                expect(scope.closestMatchFilter(card)).toBe(false);
            });      
            
            it('should block if card is PP, variable, next day', function() {
                expect(scope.criteria.count()).toBe(3);
                var card = {
                    isPP: true,
                    cardValue: 'variable',
                    graphicCustomization: 'whatever',
                    deliveryTime: 1
                };
                expect(scope.closestMatchFilter(card)).toBe(false);
            });            
        });
    });

    describe('edge case "variable, full, 5 days"', function() {
        beforeEach(function() {
            scope.criteria.cardValue = 'variable';
            scope.criteria.graphicCustomization = 'full';
            scope.criteria.deliveryTime = 5;
        });

        describe('exactMatchFilter', function() {

            it('should pass if card is PP, full, 30 days', function() {
                expect(scope.criteria.count()).toBe(3);
                var card = {
                    isPP: true,
                    cardValue: 'standardAndVariable',
                    graphicCustomization: 'full',
                    deliveryTime: 30
                };
                expect(scope.exactMatchFilter(card)).toBe(true);
            });

            it('should pass if card is PP, partial, 5 days', function() {
                expect(scope.criteria.count()).toBe(3);
                var card = {
                    isPP: true,
                    cardValue: 'standardAndVariable',
                    graphicCustomization: 'partial',
                    deliveryTime: 5
                };
                expect(scope.exactMatchFilter(card)).toBe(true);
            });
           
        });

        describe('closestMatchFilter', function() {
           
            it('should block if card is PP, full, 30 days', function() {
                expect(scope.criteria.count()).toBe(3);
                var card = {
                    isPP: true,
                    cardValue: 'standardAndVariable',
                    graphicCustomization: 'full',
                    deliveryTime: 30
                };
                expect(scope.closestMatchFilter(card)).toBe(false);
            });           

            it('should block if card is PP, partial, 5 days', function() {
                expect(scope.criteria.count()).toBe(3);
                var card = {
                    isPP: true,
                    cardValue: 'standardAndVariable',
                    graphicCustomization: 'partial',
                    deliveryTime: 5
                };
                expect(scope.closestMatchFilter(card)).toBe(false);
            });            
        });
    });

});



