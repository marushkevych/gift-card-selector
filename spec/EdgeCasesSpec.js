describe("Edge Cases", function() {

    var scope;
    beforeEach(function() {
        scope = {};
        SelectorController(scope);
    });


    describe('two criteria selected: graphicCustomization and deliveryTime', function() {

        describe('edge case "partial, next day"', function() {
            beforeEach(function() {
                scope.criteria.graphicCustomization = 'partial';
                scope.criteria.deliveryTime = 1;
            });

            describe('exactMatchFilter', function() {

                it('should pass if card is PP, Partial, 5 days', function() {
                    expect(scope.criteria.count()).toBe(2);
                    var card = {
                        isPP: true,
                        cardValue: 'foo',
                        graphicCustomization: 'partial',
                        deliveryTime: 5
                    };
                    expect(scope.exactMatchFilter(card)).toBe(true);
                });
                
                it('should pass if card is PP, cardValue is standard, 1 day', function() {
                    expect(scope.criteria.count()).toBe(2);
                    var card = {
                        isPP: true,
                        cardValue: 'standard',
                        graphicCustomization: 'none',
                        deliveryTime: 1
                    };
                    expect(scope.exactMatchFilter(card)).toBe(true);
                });
                
                it('should pass if card is PP, cardValue is variable, 1 day', function() {
                    expect(scope.criteria.count()).toBe(2);
                    var card = {
                        isPP: true,
                        cardValue: 'variable',
                        graphicCustomization: 'none',
                        deliveryTime: 1
                    };
                    expect(scope.exactMatchFilter(card)).toBe(true);
                });
            });

            describe('closestMatchFilter', function() {

                it('should pass if card is not PP, Partial, 5 days', function() {
                    expect(scope.criteria.count()).toBe(2);
                    var card = {
                        isPP: false,
                        cardValue: 'foo',
                        graphicCustomization: 'partial',
                        deliveryTime: 5
                    };
                    expect(scope.closestMatchFilter(card)).toBe(true);
                });
                
                it('should pass if card is not PP, cardValue is standard, 1 day', function() {
                    expect(scope.criteria.count()).toBe(2);
                    var card = {
                        isPP: false,
                        cardValue: 'standard',
                        graphicCustomization: 'none',
                        deliveryTime: 1
                    };
                    expect(scope.closestMatchFilter(card)).toBe(true);
                });
                
                it('should pass if card is not PP, cardValue is variable, 1 day', function() {
                    expect(scope.criteria.count()).toBe(2);
                    var card = {
                        isPP: false,
                        cardValue: 'variable',
                        graphicCustomization: 'none',
                        deliveryTime: 1
                    };
                    expect(scope.closestMatchFilter(card)).toBe(true);
                });
            });

        });

        describe('edge case "full custom, next day"', function() {
            beforeEach(function() {
                scope.criteria.graphicCustomization = 'full';
                scope.criteria.deliveryTime = 1;
            });

            describe('exactMatchFilter', function() {

                it('should pass if card is PP, full custom, 30 days', function() {
                    expect(scope.criteria.count()).toBe(2);
                    var card = {
                        isPP: true,
                        cardValue: 'foo',
                        graphicCustomization: 'full',
                        deliveryTime: 30
                    };
                    expect(scope.exactMatchFilter(card)).toBe(true);
                });
                
                it('should pass if card is PP, cardValue is standard, 1 day', function() {
                    expect(scope.criteria.count()).toBe(2);
                    var card = {
                        isPP: true,
                        cardValue: 'standard',
                        graphicCustomization: 'none',
                        deliveryTime: 1
                    };
                    expect(scope.exactMatchFilter(card)).toBe(true);
                });
                
                it('should pass if card is PP, cardValue is variable, 1 day', function() {
                    expect(scope.criteria.count()).toBe(2);
                    var card = {
                        isPP: true,
                        cardValue: 'variable',
                        graphicCustomization: 'none',
                        deliveryTime: 1
                    };
                    expect(scope.exactMatchFilter(card)).toBe(true);
                });
            });

            describe('closestMatchFilter', function() {

                it('should pass if card is not PP, full custom, 30 days', function() {
                    expect(scope.criteria.count()).toBe(2);
                    var card = {
                        isPP: false,
                        cardValue: 'foo',
                        graphicCustomization: 'full',
                        deliveryTime: 30
                    };
                    expect(scope.closestMatchFilter(card)).toBe(true);
                });
                
                it('should pass if card is not PP, cardValue is standard, 1 day', function() {
                    expect(scope.criteria.count()).toBe(2);
                    var card = {
                        isPP: false,
                        cardValue: 'standard',
                        graphicCustomization: 'none',
                        deliveryTime: 1
                    };
                    expect(scope.closestMatchFilter(card)).toBe(true);
                });
                
                it('should pass if card is not PP, cardValue is variable, 1 day', function() {
                    expect(scope.criteria.count()).toBe(2);
                    var card = {
                        isPP: false,
                        cardValue: 'variable',
                        graphicCustomization: 'none',
                        deliveryTime: 1
                    };
                    expect(scope.closestMatchFilter(card)).toBe(true);
                });
            });

        });

        describe('edge case "full custom, 5 days"', function() {
            beforeEach(function() {
                scope.criteria.graphicCustomization = 'full';
                scope.criteria.deliveryTime = 5;
            });

            describe('exactMatchFilter', function() {
                
                it('should pass if card is PP, Partial, 5 days', function() {
                    expect(scope.criteria.count()).toBe(2);
                    var card = {
                        isPP: true,
                        cardValue: 'foo',
                        graphicCustomization: 'partial',
                        deliveryTime: 5
                    };
                    expect(scope.exactMatchFilter(card)).toBe(true);
                });                

                it('should pass if card is PP, full custom, 30 days', function() {
                    expect(scope.criteria.count()).toBe(2);
                    var card = {
                        isPP: true,
                        cardValue: 'foo',
                        graphicCustomization: 'full',
                        deliveryTime: 30
                    };
                    expect(scope.exactMatchFilter(card)).toBe(true);
                });
                
                it('should pass if card is PP, cardValue is standard, 1 day', function() {
                    expect(scope.criteria.count()).toBe(2);
                    var card = {
                        isPP: true,
                        cardValue: 'standard',
                        graphicCustomization: 'none',
                        deliveryTime: 1
                    };
                    expect(scope.exactMatchFilter(card)).toBe(true);
                });
                
                it('should pass if card is PP, cardValue is variable, 1 day', function() {
                    expect(scope.criteria.count()).toBe(2);
                    var card = {
                        isPP: true,
                        cardValue: 'variable',
                        graphicCustomization: 'none',
                        deliveryTime: 1
                    };
                    expect(scope.exactMatchFilter(card)).toBe(true);
                });
            });

            describe('closestMatchFilter', function() {
                
                it('should pass if card is not PP, Partial, 5 days', function() {
                    expect(scope.criteria.count()).toBe(2);
                    var card = {
                        isPP: false,
                        cardValue: 'foo',
                        graphicCustomization: 'partial',
                        deliveryTime: 5
                    };
                    expect(scope.closestMatchFilter(card)).toBe(true);
                });                

                it('should pass if card is not PP, full custom, 30 days', function() {
                    expect(scope.criteria.count()).toBe(2);
                    var card = {
                        isPP: false,
                        cardValue: 'foo',
                        graphicCustomization: 'full',
                        deliveryTime: 30
                    };
                    expect(scope.closestMatchFilter(card)).toBe(true);
                });
                
                it('should pass if card is not PP, cardValue is standard, 1 day', function() {
                    expect(scope.criteria.count()).toBe(2);
                    var card = {
                        isPP: false,
                        cardValue: 'standard',
                        graphicCustomization: 'none',
                        deliveryTime: 1
                    };
                    expect(scope.closestMatchFilter(card)).toBe(true);
                });
                
                it('should pass if card is not PP, cardValue is variable, 1 day', function() {
                    expect(scope.criteria.count()).toBe(2);
                    var card = {
                        isPP: false,
                        cardValue: 'variable',
                        graphicCustomization: 'none',
                        deliveryTime: 1
                    };
                    expect(scope.closestMatchFilter(card)).toBe(true);
                });
            });

        });



    });

    describe('when criteria count is 3', function() {



    });



});

