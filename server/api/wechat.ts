import * as Router from 'koa-router'
import { getUserInfo, getSignSDK } from 'wechat-auth-middleware'

const router = new Router({ prefix: '/wechat' })

// 获取微信基本信息接口
router.get('/getUserInfo', getUserInfo)

// 获取微信JS SDK签名所需字段
router.get('/getSignSdk', getSignSDK)

export default router

