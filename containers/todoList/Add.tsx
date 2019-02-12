/* eslint-env browser */
import React from 'react'
import { Provider, observer } from 'mobx-react'
import GuestStore from './store'
import { Router } from '../routes'
import CommonStore from '../store/common'
import styled from 'styled-components'
const AddCon = styled.div`
.addSty{
  padding:1.0667rem 0.5333rem;
  .inputSty{
    display:flex;
    justify-content:space-between;
    align-items:center;
    font-size:14px;
    color:#464646;
    height:1.0667rem;
    line-height:1.0667rem;
    margin-bottom:0.2667rem;
  >p{
    width:2.4rem;
    font-weight:bold;
    font-size:17px;
  }
  >input{
    flex:1;
    height:1.0667rem;
    line-height:1.0667rem;
    border-bottom:0.0267rem solid #e6e6e6;
    &::-webkit-input-placeholder {
      color: #BCBCBC;
      font-size:14px;
    }
   }
  }
  .sureBtn{
    border-radius:0.5333rem;
    height:0.9333rem;
    line-height:0.9333rem;
    font-size:14px;
    color:white;
    padding:0 0.5333rem;
    margin:1.3333rem auto 0 auto;
    background:#12C287;
    text-align:center;
    width:5.3333rem;
  }
}

`
if (typeof window !== 'undefined') {
  window.document.title = 'dodoList'
}
@observer
export default class Add extends React.Component<any> {
  static getInitialProps({ query: { editIndex } }) {
    return { editIndex }
  }
  state = {
    region: '',
  }
  componentDidMount() {
    const { editIndex } = this.props
    const { userInfo } = GuestStore
    if (editIndex) {
      console.log('editIndex', editIndex)
      GuestStore.changeObservable('addUser', userInfo[JSON.parse(editIndex)])
    } else {
      GuestStore.changeObservable('addUser', {  region: '',
      name: '',
      roomId: '',
      channel: '',
      signTime: '',
      subTime: '',
      reception: '',
      original: '',
      passport: ''})
    }
  }
  checkLogin() {
    const success = true
    if (success) {
      Router.pushRoute('/list')
    } else {
      CommonStore.showToastMsg('密码错误')
    }
  }
  sureChange() {
    const { addUser, userInfo } = GuestStore
    const { editIndex } = this.props
    if (editIndex) {
      userInfo[JSON.parse(editIndex)] = addUser
    } else {
      userInfo.push(addUser)
    }
    Router.pushRoute('/list')
  }
  setInputValue(e, what) {
    const { addUser } = GuestStore
    addUser[what] = e.target.value
  }
  render() {
    const { editIndex } = this.props
    const { addUser } = GuestStore
    const { region, name, roomId, channel, signTime, subTime, reception, original, passport } = addUser
    return (
      <Provider guestStore={GuestStore} >
        <AddCon>
          <div className="addSty">
            <div className="inputSty">
              <p>region :</p>
              <input type="text" value={region} placeholder="请输入地区" onChange={(e) => { this.setInputValue(e, 'region') }} />
            </div>
            <div className="inputSty">
              <p>name :</p>
              <input type="text" value={name} placeholder="请输入姓名" onChange={(e) => { this.setInputValue(e, 'name') }} />
            </div>
            <div className="inputSty">
              <p>roomId :</p>
              <input type="text" value={roomId} placeholder="请输入房号" onChange={(e) => { this.setInputValue(e, 'roomId') }} />
            </div>
            <div className="inputSty">
              <p>channel :</p>
              <input type="text" value={channel} placeholder="请输入渠道" onChange={(e) => { this.setInputValue(e, 'channel') }} />
            </div>
            <div className="inputSty">
              <p>signTime :</p>
              <input type="text" value={signTime} placeholder="请输入签约时间" onChange={(e) => { this.setInputValue(e, 'signTime') }} />
            </div>
            <div className="inputSty">
              <p>subTime :</p>
              <input type="text" value={subTime} placeholder="请输入递交时间" onChange={(e) => { this.setInputValue(e, 'subTime') }} />
            </div>
            <div className="inputSty">
              <p>reception :</p>
              <input type="text" value={reception} placeholder="请输入接收函时间" onChange={(e) => { this.setInputValue(e, 'reception') }} />
            </div>
            <div className="inputSty">
              <p>original :</p>
              <input type="text" value={original} placeholder="请输入原批" onChange={(e) => { this.setInputValue(e, 'original') }} />
            </div>
            <div className="inputSty">
              <p>passport :</p>
              <input type="text" value={passport} placeholder="请输入护照号" onChange={(e) => { this.setInputValue(e, 'passport') }} />
            </div>
            <div className="sureBtn" onClick={() => { this.sureChange() }}>{editIndex ? '确认修改' : '确认增加'}</div>
          </div>
        </AddCon>
      </Provider >
    )
  }
}

