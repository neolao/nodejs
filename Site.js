var neolao          = require('./index.js'),
    express         = require('express'),
    http            = require('http'),
    mustache        = require('hogan-express'),
    Request         = require('./site/Request.js');



/**
 * Site
 *
 * @class       neolao.Site
 */
module.exports = function()
{
    this._express = express();
};
proto = module.exports.prototype;



/**
 * Middleware Express
 *
 * @type    express
 */
proto._express = null;

/**
 * Server port
 *
 * @type    Integer
 */
proto._serverPort = null;

/**
 * Server name
 *
 * @type    String
 */
proto._serverName = null;

/**
 * Controllers path
 *
 * @type    String
 */
proto._controllersPath = null;

/**
 * Views path
 *
 * @type    String
 */
proto._viewsPath = null;

/**
 * Public path
 *
 * @type    String
 */
proto._publicPath = null;

/**
 * Get the representation string
 *
 * @return  String          The representation string
 */
proto.toString = function()
{
    return '[neolao.Site]';
};

/**
 * Server port
 *
 * @type    Integer
 */
Object.defineProperty(proto, 'serverPort',
{
    get: function()
    {
        return this._serverPort;
    },
    set: function(port)
    {
        this._serverPort = port;
        this._express.set('port', this._serverPort);
    }
});

/**
 * Server name
 *
 * @type    String
 */
Object.defineProperty(proto, 'serverName',
{
    get: function()
    {
        return this._serverName;
    },
    set: function(name)
    {
        this._serverName = name;
    }
});

/**
 * Controllers path
 *
 * @type    String
 */
Object.defineProperty(proto, 'controllersPath',
{
    get: function()
    {
        return this._controllersPath;
    },
    set: function(path)
    {
        this._controllersPath = path;
    }
});

/**
 * Views path
 *
 * @type    String
 */
Object.defineProperty(proto, 'viewsPath',
{
    get: function()
    {
        return this._viewsPath;
    },
    set: function(path)
    {
        this._viewsPath = path;
        this._express.set('views', this._viewsPath);
    }
});

/**
 * Public  path
 *
 * @type    String
 */
Object.defineProperty(proto, 'publicPath',
{
    get: function()
    {
        return this._publicPath;
    },
    set: function(path)
    {
        this._publicPath = path;
        this._express.use(express.static(this._publicPath));
    }
});


/**
 * Configure the routes
 *
 * @param   Object      routes      Routes configuration
 */
proto.configureRoutes = function(routes)
{
    var self = this,
        route, routeName, routeHandler;

    routeHandler = function(route)
    {
        var routePattern    = route.pattern,
            routeController = route.controller,
            routeAction     = route.action,
            routeReverse    = route.reverse,
            routePath;

        if (routePattern === undefined) {
            routePath = '*';
        } else {
            routePath = eval(routePattern);
        }

        self._express.get(routePath, function(serverRequest, serverResponse)
        {
            var ControllerClass = require(self._controllersPath+'/'+routeController),
                controller      = new ControllerClass(),
                request         = new Request();

            request.serverRequest   = serverRequest;
            request.action          = routeAction;
            controller.response     = serverResponse;
            controller.dispatch(request);
        });
    };
    for (routeName in routes) {
        route = routes[routeName];
        routeHandler(route);
    }
};

/**
 * Run the site
 */
proto.run = function()
{
    var self = this;

    // Initialize the views
    this._express.engine('mustache', mustache);
    this._express.set('view engine', 'mustache');
    this._express.set('partials', {
        _header: '_header',
        _footer: '_footer'
    });

    //application.use(express.favicon());
    //application.use(express.logger('dev'));
    //application.use(express.bodyParser());
    //application.use(express.methodOverride());
    //application.use(application.router);

    // Error handler
    this._express.configure('development', function()
    {
        self._express.use(express.errorHandler());
    });


    // Run the server
    http.createServer(this._express).listen(this._express.get('port'), function()
    {
        console.log("Server listening on port " + self._express.get('port'));
    });

};


