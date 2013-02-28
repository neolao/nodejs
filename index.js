/**
 * Change the scope of a function
 * 
 * @param   Object      scope           The new scope
 * @return  Function                    The function with a new scope
 */
Function.prototype.delegate = function(scope)
{
    var f = function(){
        return arguments.callee.func.apply(arguments.callee.target, arguments);
    };
    f.target = scope;
    f.func = this;
    return f;
};

/**
 * Extend a class
 * 
 * @param   Function    base            The class object
 */
Function.prototype.extends = function(base)
{
    var util = require('util');
    util.inherits(this, base);
};
