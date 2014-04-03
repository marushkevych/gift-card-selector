describe("ComposeFilter", function() {

    it("should apply next filter only of current filter didnt return true or false", function() {
        function filter1(arg) {
            if (arg > 10)
                return false;
        }
        function filter2(arg) {
            if (arg > 5)
                return true;
        }
        function filter3(arg) {
            if (arg === 4)
                return 'bingo';
        }

        expect(composeFilters(filter1, filter2, filter3)(6)).toBe(true);
        expect(composeFilters(filter1, filter2, filter3)(11)).toBe(false);
        expect(composeFilters(filter1, filter2, filter3)(4)).toBe('bingo');
        expect(composeFilters(filter1, filter2, filter3)(3)).toBe(undefined);
    });
});
