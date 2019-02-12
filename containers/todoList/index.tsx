/* eslint-env browser */
import React from 'react'
import { Provider, observer } from 'mobx-react'
import GuestStore from './store'
import { Router } from '../routes'
import CommonStore from '../store/common'
if (typeof window !== 'undefined') {
  window.document.title = 'dodoList'
}
@observer
export default class Index extends React.Component<any> {
  checkLogin() {
     const success = true
     if (success) {
      Router.pushRoute('/list')
     } else {
       CommonStore.showToastMsg('密码错误')
     }
  }
  render() {
    return (
      <Provider guestStore={GuestStore} >
        <div onClick={() => {this.checkLogin()}}>
            登录是否成功了
        </div>
      </Provider >
    )
  }
}

