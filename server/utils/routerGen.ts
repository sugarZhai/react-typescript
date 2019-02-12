import * as fs from 'fs'
import * as Router from 'koa-router'
const routerGen = (routerPath) => {
  const healthCheck = new Router()
  healthCheck.get('/health', (ctx) => {
    ctx.body = 'ok'
  })

  const envRouter = new Router()
  envRouter.get('/env', (ctx) => {
    ctx.body = { env: process.env.DEPLOY_ENV }
  })

  const rootRouter = new Router()
  rootRouter.use(healthCheck.routes(), healthCheck.allowedMethods())
  rootRouter.use(envRouter.routes(), envRouter.allowedMethods())

  const router = new Router({ prefix: '/api' })
  let subRouter
  fs.readdirSync(routerPath)
    .filter((filename) => filename.endsWith(process.env.NODE_ENV !== 'production' ? '.ts' : '.js'))
    .forEach((filename) => {
      subRouter = require(`${routerPath}/${filename}`)
      router.use(subRouter.default.routes(), subRouter.default.allowedMethods())
    })

  rootRouter.use(router.routes(), router.allowedMethods())

  return rootRouter
}

export default routerGen

