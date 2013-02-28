/**
 * Site request
 *
 * @class       neolao.site.Request
 */
module.exports = function()
{
};
proto = module.exports.prototype;



/**
 * Server request of NodeJS
 *
 * @type http.ServerRequest
 */
proto.serverRequest = null;

/**
 * Current action
 *
 * @type String
 */
proto.action = null;

/**
 * Get the representation string
 *
 * @return  String          The representation string
 */
proto.toString = function()
{
    return '[neolao.site.Request]';
};


