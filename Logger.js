var neolao              = require('./index'),
    AbstractListener    = require('./logger/AbstractListener');



/**
 * Logger
 *
 * @class       neolao/Logger
 */
function klass()
{
    this._listeners = [];
};
proto = klass.prototype;


// Constants
define(proto, 'EMERGENCY',  'emergency');
define(proto, 'ALERT',      'alert');
define(proto, 'CRITICAL',   'critical');
define(proto, 'ERROR',      'error');
define(proto, 'WARNING',    'warning');
define(proto, 'NOTICE',     'notice');
define(proto, 'INFO',       'info');
define(proto, 'DEBUG',      'debug');

/**
 * The singleton instance
 *
 * @type    neolao/Logger
 */
proto._instance = null;

/**
 * Listeners
 *
 * @type    Array
 */
proto._listeners = null;


/**
 * Get the representation string
 *
 * @return  String                  The representation string
 */
proto.toString = function()
{
    return '[neolao/Logger]';
};

/**
 * Add a listener
 *
 * @param   neolao/logger/AbstractListener      listener    Listener instance
 */
proto.addListener = function(listener)
{
    if (listener instanceof AbstractListener === false) {
        return;
    }
    this._listeners.push(listener);
};

/**
 * System is unusable
 *
 * @param   String      message     The message
 * @param   Object      context     The context
 */
proto.emergency = function(message, context)
{
    this.log(this.EMERGENCY, message, context);
};


/**
 * Action must be taken immediately
 *
 * @param   String      message     The message
 * @param   Object      context     The context
 */
proto.alert = function(message, context)
{
    this.log(this.ALERT, message, context);
};

/**
 * Critical condition
 *
 * @param   String      message     The message
 * @param   Object      context     The context
 */
proto.critical = function(message, context)
{
    this.log(this.CRITICAL, message, context);
};

/**
 * Runtime errors that do not require immediate action but should typically be logged and monitored
 *
 * @param   String      message     The message
 * @param   Object      context     The context
 */
proto.error = function(message, context)
{
    this.log(this.ERROR, message, context);
};

/**
 * Exceptional occurrences that are not errors
 *
 * @param   String      message     The message
 * @param   Object      context     The context
 */
proto.warning = function(message, context)
{
    this.log(this.WARNING, message, context);
};

/**
 * Normal but significant events
 *
 * @param   String      message     The message
 * @param   Object      context     The context
 */
proto.notice = function(message, context)
{
    this.log(this.NOTICE, message, context);
};

/**
 * Interesting event
 *
 * @param   String      message     The message
 * @param   Object      context     The context
 */
proto.info = function(message, context)
{
    this.log(this.INFO, message, context);
};

/**
 * Detailed debug information
 *
 * @param   String      message     The message
 * @param   Object      context     The context
 */
proto.debug = function(message, context)
{
    this.log(this.DEBUG, message, context);
};

/**
 * Logs with an arbitrary level
 *
 * @param   String      level       The level
 * @param   String      message     The message
 * @param   Object      context     The context
 */
proto.log = function(level, message, context)
{
    var count, index,
        generatedMessage, name, value,
        listener;

    // Default values
    if (typeof context === 'undefined') {
        context = {};
    }

    // Generate the message with the context
    generatedMessage = message;
    for (name in context) {
        value = context[name];
        generatedMessage = generatedMessage.replace('{' + name + '}', value);
    }

    // Execute the log method on each listener
    count = this._listeners.length;
    for (index = 0; index < count; index++) {
        listener = this._listeners[index];
        listener.log(level, generatedMessage);
    }
};

/**
 * Get singleton instance
 *
 * @return  neolao/I18n     Singleton instance
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
