import * as os from 'os'

const getIpAddress = port => {
  const interfaces = os.networkInterfaces()
  Object.keys(interfaces).map(devName => {
    const iface = interfaces[devName]
    if (Array.isArray(iface)) {
      iface.some(alias => {
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
          console.log(`> http://${alias.address}:${port}`)
          return true
        }
      })
    }
  })
}
export default getIpAddress

