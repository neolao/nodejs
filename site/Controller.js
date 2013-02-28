/**
 * Site controller
 *
 * @class       neolao.site.Controller
 */
module.exports = function()
{
};
proto = module.exports.prototype;



/**
 * Server response
 *
 * @type http.ServerResponse
 */
proto.response = null;

/**
 * Get the representation string
 *
 * @return  String          The representation string
 */
proto.toString = function()
{
    return '[neolao.site.Controller]';
};

/**
 * Dispatch
 *
 * @param   neolao.site.Request     request     Request instance
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

