import koa from 'koa'
import responseTime from 'koa-response-time'
import logger from 'koa-logger'
import routing from './routing'



let app = koa();
app.name = 'devbot-manager-ssr'

app.use(responseTime());
app.use(logger());

app.proxy = true


app = routing(app)


console.log('listening on port 9080');
app.listen(9080);


