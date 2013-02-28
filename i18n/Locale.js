var neolao  = require('../index.js');



/**
 * Locale
 *
 * @class   neolao.i18n.Locale
 * @param   String              localeString        The locale string
 */
module.exports = function(localeString)
{
    this._localeString  = localeString;
    this._messages      = [];
};
proto = module.exports.prototype;



/**
 * The locale string
 *
 * @type    String
 */
proto._localeString = null;

/**
 * The messages
 *
 * @type    Object
 */
proto._messages = null;



/**
 * Get the representation string
 *
 * @return  String          The representation string
 */
proto.toString = function()
{
    return '[neolao.i18n.Locale]';
};

/**
 * The locale string
 *
 * @type    String
 */
Object.defineProperty(proto, 'localeString',
{
    get: function()
    {
        return this._localeString;
    }
});

/**
 * Configure the messages
 *
 * @param   Object      messages        The messages
 */
proto.configureMessages = function(messages)
{
    this._messages = messages;
};

/**
 * Get a message
 *
 * @param   String      messageId       The message id
 * @param   Array       parameters      The parameters
 * @return  String                      The translated message
 */
proto.getMessage = function(messageId, parameters)
{
    if (this._messages[messageId]) {
        return this._messages[messageId];
    }
    return messageId;
};


