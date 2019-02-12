import * as Koa from 'koa'
import * as next from 'next'
import * as path from 'path'

import * as compress from 'compression'
import * as bodyParser from 'koa-bodyparser'
import * as connect from 'koa-connect'
import * as session from 'koa-session'
// import * as logger from 'tac-logger'
import { wechatAuth } from 'wechat-auth-middleware'

// import log4js from '../config/log4js'
import { gwPath } from '../config/env'
import routes from '../containers/routes'
import pageRoute from './middleware/pageRoute'
import routerGen from './utils/routerGen'
import getIpAddress from './utils/getIpAddress'
import pagesGen from './utils/pagesGen'

const port = parseInt(process.env.PORT, 10) || 8080
const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handler = routes.getRequestHandler(app)
const apiRoutePath = path.resolve(__dirname, './api')

const SESSION_CONFIG = {
  key: 'za:sess', /** (string) cookie key (default is koa:sess) */
  maxAge: 86400000, /** (number) maxAge in ms (default is 1 days) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
}
pagesGen()
// With koa
app.prepare().then(() => {
  const server = new Koa()
  server.keys = ['Excellence is a habit']
  const apiRoute = routerGen(apiRoutePath)
  server.use(connect(compress()))
    .use(session(SESSION_CONFIG, server))
    .use(bodyParser())
    .use(apiRoute.routes())
    .use(wechatAuth(gwPath))
    .use(apiRoute.allowedMethods())
    .use(async (ctx, nxt) => {
      if (ctx.url.indexOf('/api/') === -1) {
        return nxt()
      }
      return ctx
    })
    .use(pageRoute(handler))
    .listen(port, () => {
      console.log(`Available on:`)
      console.log(`> http://localhost:${port}`)
      getIpAddress(port)
    })
})
