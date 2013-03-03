var neolao          = require('../../../index');


/**
 * Abstract helper of a controller
 *
 * @class       neolao/site/helper/controller/AbstractHelper
 */
module.exports = function()
{
};
proto = module.exports.prototype;



/**
 * Controller instance
 *
 * @type    neolao/site/Controller
 */
proto._controller = null;


/**
 * Get the representation string
 *
 * @return  String          The representation string
 */
proto.toString = function()
{
    return '[neolao/site/helper/controller/AbstractHelper]';
};

/**
 * Set the controller instance
 *
 * @param   neolao/site/Controller      controller      Controller instance
 */
proto.setController = function(controller)
{
    var Controller = require('../../Controller');
    if (controller instanceof Controller === false) {
        return;
    }

    this._controller = controller;
};

/**
 * Main access of the helper
 */
proto.main = function()
{
    
};

