import React from 'react';
import Router from 'koa-router'
import { match, RoutingContext } from 'react-router'
import ReactDOMServer from 'react-dom/server'
import routes from '../../reactClient/modules/routes/RootRoute'
import bodyParser from 'koa-bodyparser'


export default function routing(app) {
    app.use(bodyParser())

    let router = new Router();

    router.get("*", function* (req, res) {
        match({ routes, location: this.req.url }, (error, redirectLocation, renderProps) => {
            this.type = "html";
            const renderedReactComponent = ReactDOMServer.renderToString(React.createElement(RoutingContext, renderProps))
            this.body = baseLayout({ content: renderedReactComponent })
        })
    });
    
    app.use(router.routes())
    
    return app

}




function baseLayout(params) {
    return `
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


           <script src="/public/__build__/main.js"></script>
    </body>
    </html>
`}