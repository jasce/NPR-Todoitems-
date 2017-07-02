'use strict';

var app = require('express')();
var http = require('http');
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
var fs = require('fs');
var database = require('./models/database');
var serverPort = process.env.PORT || 8080;

// swaggerRouter configuration
var options = {
  swaggerUi: '/swagger.json',
  controllers: './controllers',
  useStubs: process.env.NODE_ENV === 'development' ? true : false // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync('./api/swagger.yaml', 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

function Authentication(req,res, next){
  console.log(req.headers);
  var result = [];
    var rha  = req.headers.authorization;
        if(rha && rha.search('Basic') === 0){          
          var creds = new Buffer(rha.split(' ')[1] , 'base64').toString();          
          var parts = creds.split(':');          
          database.pool.connect(function(err, client, done){
            if(err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
          }  
          const user = client.query('SELECT * FROM users WHERE email = $1' , [parts[0]] );     

              user.on('row', (row) => {                  
                  result.push(row);
                });

            // After all data is returned, close connection and return results
                user.on('end', () => {
                  //database.pool.end();
                  if(result.length === 0 ){
                    res.statusCode = 401;
                    res.statusMessage = 'Invalid Credentials';
                    res.end();
                  }
                  else{
                  next();
                }
                });
            })    
            
        }
        else{
          res.statusCode = 401;
          res.statusMessage = 'Please provide credentials to login';
          res.end();
        }
  }

app.use( /^\/(?!v2\/user).*/ ,function (req,res,next) {    
  
  if(req.baseUrl.match(/^\/docs.*/) || req.baseUrl.match(/^\/api-docs.*/))   next();
  else{
    Authentication(req, res, next);
  }   

});




// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());
  
  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  app.use(middleware.swaggerSecurity({
        //manage token function in the 'auth' module
        BasicAuth: function(req ,  def , scopes , callback){
                  
          callback();    
        }
}));
  
  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());

  // Start the server
  http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d ', serverPort);
    console.log('Swagger-ui is available on /docs',);
  });
});
