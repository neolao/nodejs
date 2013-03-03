var neolao          = require('../index');

/**
 * Site controller
 *
 * @class       neolao/site/Controller
 */
module.exports = function()
{
    // Initialize the properties
    this._helpers = {};
};
proto = module.exports.prototype;



/**
 * Server response
 *
 * @type http.ServerResponse
 */
proto.response = null;

/**
 * Helpers
 *
 * @type    Object
 */
proto._helpers = null;


/**
 * Get the representation string
 *
 * @return  String          The representation string
 */
proto.toString = function()
{
    return '[neolao/site/Controller]';
};

/**
 * Register a helper
 *
 * @param   String                                          key         Helper key in this controller
 * @param   neolao/site/helper/controller/AbstractHelper    helper      Helper instance
 */
proto.registerHelper = function(key, helper)
{
    var AbstractHelper = require('./helper/controller/AbstractHelper');
    if (helper instanceof AbstractHelper === false) {
        return;
    }

    // Configure the helper
    helper.setController(this);

    // Save the instance in a list
    this._helpers[key] = helper;

    // Create the public access
    this[key] = helper.main;
};

/**
 * Dispatch
 *
 * @param   neolao/site/Request     request     Request instance
 */
proto.dispatch = function(request)
{
    var actionName = request.action + 'Action';

    this[actionName]();
};

/**
 * Render a view
 *
 * @param   String      viewName    View name
 */
proto.render = function(viewName)
{
    this.response.render(viewName);
};

