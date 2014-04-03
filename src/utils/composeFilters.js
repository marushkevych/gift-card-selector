module.exports = composeFilters;

/**
 * Compose filer function with edge case functions
 * Filter function should be last argument.
 * 
 * Edge case function can return true false or undefined. 
 * If edge case returns true of false, that becames the reuslt of compose function.
 * 
 * @returns {Function}
 */
function composeFilters(){
    var args = Array.prototype.slice.call(arguments, 0);
    return function(value){
        for(var i = 0; i < args.length; i++){
            var result = args[i](value);
            if(result !== undefined){
                return result;
            }
        }
    };
}

