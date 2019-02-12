import routeInstance from './common/gatewayRoutes'
import todo from './todoList/route'
const routeConfig = [
  ...todo,
]
routeConfig.map(item => routeInstance.add.apply(routeInstance, item))

export {
  routeConfig
}
export const Link = routeInstance.Link
export const Router = routeInstance.Router
export default routeInstance
