export default (handler) => async (ctx) => {
  ctx.status = 200
  handler(ctx.req, ctx.res)
  ctx.respond = false // 取消koa对res的封装处理
}
