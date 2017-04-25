const express = require('express')

var swaggerJSDoc = require('swagger-jsdoc');

var app = express()

var swaggerDefinition = {
  info: {
    title: 'Node Swagger API',
    version: '1.0.0',
    description: 'Demonstrating how to describe a RESTful API with Swagger',
  },
  host: 'HOSTNAME',
  scheme: 'https',
  basePath: '/pkg',
  securityDefinitions:{"basic":{"type":"basic"}},
  securityRequirement: [{"basic":[]}],
};

// options for the swagger docs
var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./route.js'],
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);

// serve swagger
app.get('/pkg/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});


const basicAuth = require('express-basic-auth')

function getUnauthorizedResponse(req) {
    return req.auth ?
        ('Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected') :
        'No credentials provided'
}

//Requires basic auth with username 'Admin' and password 'secret1234'
var staticUserAuth = basicAuth({
    users: {
	'john': 'secret'
    },
    challenge: false,
    unauthorizedResponse: getUnauthorizedResponse
})

app.get('/pkg/static', staticUserAuth, function(req, res) {
    res.status(200).send('You passed')
})



app.listen(3000, function() {
    console.log("Listening!")
})

