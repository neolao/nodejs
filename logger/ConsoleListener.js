var neolao              = require('../index'),
    AbstractListener    = require('./AbstractListener');



/**
 * Console listener of the logger
 *
 * @class       neolao/logger/FileListener
 */
module.exports = function()
{
};
module.exports.extends(AbstractListener);
proto = module.exports.prototype;

/**
 * Get the representation string
 *
 * @return  String                  The representation string
 */
proto.toString = function()
{
    return '[neolao/logger/ConsoleListener]';
};

/**
 * Log a message
 *
 * @param   String      level       The level
 * @param   String      message     The message
 */
proto.log = function(level, message)
{
    var date    = new Date(),
        year    = date.getFullYear(),
        month   = date.getMonth() + 1,
        day     = date.getDate(),
        hours   = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds(),
        generatedMessage;

    // Add the date
    if (month < 10) {
        month = '0' + month;
    }
    if (day < 10) {
        day = '0' + day;
    }
    if (hours < 10) {
        hours = '0' + hours;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    generatedMessage = '[' + year + '/' + month + '/' + day + ' ' + hours + ':' + minutes + ':' + seconds + ']';
    generatedMessage += ' ' + message;

    console.log(generatedMessage);
};


