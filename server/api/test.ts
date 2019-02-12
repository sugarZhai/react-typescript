import * as Router from 'koa-router'
const testRouter = new Router({ prefix: '/test' })

testRouter.get('/a', (ctx) => {
  ctx.status = 200
  ctx.body = {
    a: 'this is  test res',
  }
})

export default testRouter


