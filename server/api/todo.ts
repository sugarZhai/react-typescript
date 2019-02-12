import * as Router from 'koa-router'
const todoRouter = new Router({ prefix: '/todo' })

todoRouter.post('/add', (ctx) => {
  ctx.status = 200
  ctx.body = {
    a: 'add',
  }
})
todoRouter.post('/query', (ctx) => {
  ctx.status = 200
  ctx.body = {
    a: 'query',
  }
})
todoRouter.post('/del', (ctx) => {
  ctx.status = 200
  ctx.body = {
    a: 'del',
  }
})
todoRouter.post('/edit', (ctx) => {
  ctx.status = 200
  ctx.body = {
    a: 'edit',
  }
})
export default todoRouter


