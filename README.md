# 基于next.js，koa2项目

## 基本用法参见pages/demo目录


## 关于css样式
使用目前react领域css最佳实践[styled-components](https://www.styled-components.com/)
### 关于rem单位计算
head引入计算html元素font-size的脚本，html标签会自动设置fontize属性，具体就是 1rem = CSS屏幕宽度的1/10，
为提高开发效率px2rem工具，可以安装vs code插件*px to rem*来实现


## tslint规范
整个项目遵循tslint规范，请务必安装对应的编辑器插件来支持代码校验,vscode可以使用 *TSLint* 插件， webStorm自带但需要配置

## 状态管理 Mobx
使用 Mobx 进行状态管理，注册 store 位置 /pages/store/index.js，开发工具:可安装谷歌插件 => Mobx Developer Tools

## 微信公众号
项目已经默认集成微信公众号相关功能，如果需要使用微信JS SDK、获取用户信息etc. 在此约定页面访问路由必须包含`/wx`字符串，
比如 只有访问 `localhost/index/wx`才会自动完成授权，后续流程如下：
 - 需要获取用户基础信息：请调用 `/api/wechat/getUserInfo`接口获取；
 - 需要获取JS SDK授权字段：调用 `/api/wechat/getSignSdk`接口获取；


## 路由系统
因为网关机制的存在，页面跳转功能禁止使用nextjs自带路由组件及方法(<Link />和 Router)，请使用pages根目录的routes.js导出的相应的两个模块，具体方法如下

### Link组件使用方式：

``` js
  import {Link} from './routes'
  <Link to="index1" params={{id: 'hello-world'}}><a>to index1</a></Link>
  <Link to="/index1/hello-world"><a>index1</a></Link>
```

### Router路由对象：
``` js
  Router.pushRoute('index1')
  Router.pushRoute('index1', {id: 'hello-world'})
  Router.pushRoute('index1', {id: 'hello-world'}, options)
```
调用方式也适用于 .replaceRoute() 和 .prefetchRoute()
