import * as fs from 'fs'
import * as fsExtra from 'fs-extra'
import * as path from 'path'
import { routeConfig } from '../../containers/routes'
const pagesGen = () => {
  routeConfig.map(item => {
    const itemDir = item.pop()
    const file = path.resolve(__dirname, '../../pages/', itemDir + '.tsx')
    fsExtra.ensureFileSync(file)
    const pathHierarchy = itemDir.replace(/\w+/g, '..')
    fs.writeFileSync(file,
`import Entry from '${pathHierarchy}/containers/${itemDir}'
export default Entry
`)
  })
}

export default pagesGen
