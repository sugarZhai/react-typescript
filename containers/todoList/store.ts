import { observable, action } from 'mobx'
// import { request } from '../common/utils/fetch'
// import CommonStore from '../store/common'

class GuestStore {
  @observable localCookie = ''// 缓存本地的cookie
  @observable addUser = {
    region: '',
    name: '',
    roomId: '',
    channel: '',
    signTime: '',
    subTime: '',
    reception: '',
    original: '',
    passport: '',
  }
  @observable userInfo = [{
    region: '中国',
    name: '吴茜（融资）ok',
    roomId: 'C2-209B 15万融资',
    channel: '上海勒逸因私出入境，delsk',
    signTime: '2017-08-08',
    subTime: '2017-08-11',
    reception: '2017-08-17',
    original: '2019-08-12',
    passport: 'NUJ89786786',
  },
  {
    region: '中国',
    name: '陈明',
    roomId: 'C2-209B 15万融资',
    channel: '上海勒逸因私出入境',
    signTime: '2017-78-08',
    subTime: '2017-08-11',
    reception: '2017-08-17',
    original: '2019-02-11',
    passport: 'NUJ89786786',
  }, {
    region: '中国',
    name: '陈明',
    roomId: 'C2-209B 15万融资',
    channel: '上海勒逸因私出入境',
    signTime: '2017-78-08',
    subTime: '2017-08-11',
    reception: '2017-08-17',
    original: '2019-08-12',
    passport: 'NUJ89786786',
  }]
  @action
  changeObservable(type, value: any) {
    this[type] = value
  }


}

export default new GuestStore()
