


1. get the docker tools https://www.docker.com/products/docker-toolbox

The Idea is like this:

We build our client app with webpack, which splitts the client code into different chunks
based on the routes and one main file, which always gets served.

We have Nginx, Meteor and Koa running. First request goes to nginx, which forwards to koa,
which renders html like that:
```
 <!doctype html>
    <html lang="">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title>Devbot Manager</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
        <div id="app">
        ${params.content}
        </div>
        <script src="/public/__build__/meteor-client-build.js"></script>
        
        <script src="/public/__build__/main-react-client.js"></script>
    </body>
    </html>
```
lets say the request went to the /about site, then we rendered the about site initially 
on the server with Koa.

In the body we loaded the meteor client code (some collections with schemas), then the main
 react client code file. This main-react-client.js file knows which js file to lazy load (based 
 on the url), it lazy loads the js code for the /about route without rerendering the site
