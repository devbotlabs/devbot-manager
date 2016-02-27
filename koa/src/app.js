import koa from 'koa'
import responseTime from 'koa-response-time'
import logger from 'koa-logger'
import handlebars from 'koa-handlebars';
import routing from './routing'



let app = koa();
app.name = 'devbot-manager-ssr'

app.use(responseTime());
app.use(logger());

app.proxy = true


app = routing(app)


console.log('listening on port 1337');
app.listen(1337);


