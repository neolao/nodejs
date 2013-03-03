var neolao          = require('../../../index'),
    AbstractHelper  = require('./AbstractHelper');



/**
 * Example of a controller helper
 *
 * @class       neolao/site/helper/controller/ExampleHelper
 */
module.exports = function()
{
    this.constructor.super_.call(this);
};
module.exports.extends(AbstractHelper);
proto = module.exports.prototype;



/**
 * Get the representation string
 *
 * @return  String          The representation string
 */
proto.toString = function()
{
    return '[neolao/site/helper/controller/ExampleHelper]';
};

/**
 * Main access of the helper
 *
 * @param   String      name        Your name
 */
proto.main = function(name)
{
    return 'Hello ' + name + '!';
};

