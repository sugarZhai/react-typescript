import * as nextRoutes from 'next-routes'

import { gwPath } from '../../config/env'

const routeInstance = nextRoutes()

routeInstance.findAndGetUrls = function (nameOrUrl, params) {
  const route = this.findByName(nameOrUrl)
  if (route) {
    const {href, as} = route.getUrls(params)
    const urls = {href: href, as: gwPath + as}
    return {route, urls, byName: true}
  } else {
    const {route, query} = this.match(nameOrUrl)
    const href = route ? route.getHref(query) : nameOrUrl
    const urls = {href: href, as: gwPath + nameOrUrl}
    return {route, urls}
  }
}

export default routeInstance
