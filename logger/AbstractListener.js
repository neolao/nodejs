var neolao  = require('../index');



/**
 * Abstract listener of the logger
 *
 * @class       neolao/logger/AbstractListener
 */
module.exports = function()
{
};
proto = module.exports.prototype;

/**
 * Get the representation string
 *
 * @return  String                  The representation string
 */
proto.toString = function()
{
    return '[neolao/logger/AbstractListener]';
};

/**
 * Log a message
 *
 * @param   String      level       The level
 * @param   String      message     The message
 */
proto.log = function(level, message)
{
    
};


