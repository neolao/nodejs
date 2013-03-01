var neolao              = require('../index'),
    AbstractListener    = require('./AbstractListener'),
    path                = require('path'),
    fs                  = require('fs');



/**
 * File listener of the logger
 *
 * @class   neolao/logger/FileListener
 * @param   String      filePath        The file path
 * @param   String      level           The filtered level
 */
module.exports = function(filePath, level)
{
    this._filePath = filePath;
    this._level = level;
};
module.exports.extends(AbstractListener);
proto = module.exports.prototype;


/**
 * The file path
 *
 * @type    String
 */
proto._filePath = null;

/**
 * The filtered level
 *
 * @type    String
 */
proto._level = null;


/**
 * Get the representation string
 *
 * @return  String                  The representation string
 */
proto.toString = function()
{
    return '[neolao/logger/FileListener]';
};

/**
 * Log a message
 *
 * @param   String      level       The level
 * @param   String      message     The message
 */
proto.log = function(level, message)
{
    // Skip of the levels do not match
    if (this._level && this._level !== level) {
        return;
    }


    var self    = this,
        date    = new Date(),
        year    = date.getFullYear(),
        month   = date.getMonth() + 1,
        day     = date.getDate(),
        hours   = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds(),
        generatedMessage,
        directoryPath;

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
    generatedMessage += ' ' + message + "\n";

    // Create the directory if necessary
    directoryPath = path.dirname(this._filePath);
    fs.exists(directoryPath, function(exists) {
        if (!exists) {
            // Create the directory and append the message into the file
            fs.mkdir(directoryPath, 0777, function(error) {
                self._append(generatedMessage);
            });
        } else {
            // The directory exists
            // Append the message into the file
            self._append(generatedMessage);
        }
    });

};

/**
 * Append a message into the file
 *
 * @param   String      message         The message
 */
proto._append = function(message)
{
    fs.appendFile(this._filePath, message, 'utf8', function(error) {
    });
    
};

