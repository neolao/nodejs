var neolao  = require('./index.js'),
    Locale  = require('./i18n/Locale.js');



/**
 * Internationalization
 *
 * @class       neolao.I18n
 */
function klass()
{
    this._locales = {};
};
proto = klass.prototype;



/**
 * The default locale string
 *
 * @type    String
 */
proto.defaultLocaleString = null;

/**
 * The singleton instance
 *
 * @type    neolao.I18n
 */
proto._instance = null;

/**
 * Locale list
 *
 * @type    Object
 */
proto._locales = null;


/**
 * Get the representation string
 *
 * @return  String          The representation string
 */
proto.toString = function()
{
    return '[neolao.I18n]';
};

/**
 * Get a message from the default locale
 *
 * @param   String      messageId       The message id
 * @param   Array       parameters      The parameters
 * @return  String                      The translated message
 */
proto.getMessage = function(messageId, parameters)
{
    var message = messageId,
        locale  = this._locales[this.defaultLocaleString];

    if (locale instanceof Locale) {
        message = locale.getMessage(messageId, parameters);
    }

    return message;
};
proto._ = proto.getMessage; // Alias

/**
 * Add a locale
 *
 * @param   neolao.i18n.Locale      locale      Locale instance
 */
proto.addLocale = function(locale)
{
    this._locales[locale.localeString] = locale;

    // Set this locale as default
    this.defaultLocaleString = locale.localeString;
};

/**
 * Get singleton instance
 *
 * @return  neolao.I18n     Singleton instance
 */
klass.getInstance = function()
{
    if (!this._instance) {
        this._instance = new klass();
    }
    return this._instance;
};


// Export the singleton instance
module.exports = klass.getInstance();
