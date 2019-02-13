/* eslint-env browser */
import React from 'react'
import { Provider, observer } from 'mobx-react'
import GuestStore from './store'
import { Router } from '../routes'
import styled from 'styled-components'
const ListCon = styled.div`
padding:0 0.2667rem;
.listBox{
  display: inline-block;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  padding-right:0.4267rem;
  .firstTitle{
    display:flex;
    justify-content:space-around;
    height:1.3333rem;
    line-height:1.3333rem;
    background:#F2F2F2;
    font-weight:500;
    font-size:16px;
    >div{
      flex:1 1 auto;
      text-align:center;
      border-left:0.0267rem solid #bcbcbc;
    }
  }
  .listUser{
    display:flex;
    justify-content:space-around;
    height:1.0667rem;
    line-height:1.0667rem;
    font-size:16px;
    >div{
      flex:1 1 auto;
      text-align:center;
      border-left:0.0267rem solid #bcbcbc;
      border-bottom:0.0267rem solid #bcbcbc;
    }
    .handleBtn{
      display:flex;
      width:5.8667rem;
      justify-content:center;
      border-right:0.0267rem solid #bcbcbc;
      >p{
        border-radius:0.5333rem;
        height:0.8rem;
        line-height:0.8rem;
        font-size:12px;
        color:white;
        padding:0 0.5333rem;
        margin-top:0.1333rem;
      }
    }
  }
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
.query{
  display:flex;
  justify-content:start;
  height:2.1333rem;
  line-height:2.1333rem;
  position:relative;
  >img{
    width:0.32rem;
    height:0.32rem;
    position:absolute;
    left:0.2667rem;
    top:0.9067rem;
  }
  >input{
    margin-top:0.6667rem;
    height:0.8rem;
    line-height:0.8rem;
    font-size:14px;
    border-radius:0.5333rem;
    padding-left:0.8rem;
    background:#F4F4F4;
    margin-right:0.1333rem;
    &::-webkit-input-placeholder {
      color: #BCBCBC;
      font-size:14px;
    }
  }
  >p{
    border-radius:0.5333rem;
    height:0.8rem;
    line-height:0.8rem;
    font-size:12px;
    color:white;
    padding:0 0.5333rem;
    margin-top:0.6667rem;
    background:#12C287;
  }
}
`
if (typeof window !== 'undefined') {
  window.document.title = 'dodoList'
}
@observer
export default class List extends React.Component<any> {
  state = {
    isQuery: false,
    queryTxt: '',
    searchImg: 'https://zhaishuangshuang292.github.io/storeImg/search.png',
  }
  componentDidMount() {
    if (typeof window !== 'undefined' && this.IsPC()) {
      document.body.style.maxWidth = '10rem'
    }
  }
  IsPC() {
    if (typeof window !== 'undefined') {
      const userAgentInfo = navigator.userAgent
      const Agents = ['Android', 'iPhone',
        'SymbianOS', 'Windows Phone',
        'iPad', 'iPod']
      let flag = true
      Agents.map(item => {
        if (userAgentInfo.indexOf(item) > 0) {
          flag = false
        }
      })
      return flag
    }

  }
  delItem(i) {
    const { userInfo } = GuestStore
    userInfo.splice(i, 1)
  }
  queryItem() {
    const { queryTxt } = this.state
    const { userInfo } = GuestStore
    const queryInfo = []
    userInfo.map((item => {
      const objInfo = Object.values(item)
      objInfo.map(u => {
        if (u.indexOf(queryTxt) > -1) {
          queryInfo.push(item)
        }
      })
    }))
    GuestStore.changeObservable('userInfo', queryInfo)
  }
  getStyle(styleTxt) {
    let styleWidth = '1.3333rem'
    const styleInfo = [
      { txt: 'region', width: '1.3333rem' },
      { txt: 'name', width: '3.3067rem' },
      { txt: 'roomId', width: '4.2667rem' },
      { txt: 'channel', width: '5.6rem' },
      { txt: 'signTime', width: '3.2rem' },
      { txt: 'subTime', width: '3.2rem' },
      { txt: 'reception', width: '3.2rem' },
      { txt: 'original', width: '3.2rem' },
      { txt: 'passport', width: '4.5333rem' },
    ]
    styleInfo.map(item => {
      if (item.txt === styleTxt) {
        styleWidth = item.width
      }
    })
    return styleWidth
  }
  changeInput(e) {
    this.setState({ queryTxt: e.target.value })
  }
  render() {
    const { userInfo } = GuestStore
    const { searchImg, queryTxt } = this.state
    return (
      <Provider guestStore={GuestStore} >
        <ListCon>
          <div className="query">
            <img src={searchImg} />
            <input type="text"
              value={queryTxt}
              placeholder="请输入关键字"
              onChange={(e) => { this.changeInput(e) }} />
            <p style={{ marginRight: '0.4rem' }} onClick={() => { this.queryItem() }}>查询</p>
            <p onClick={() => { Router.pushRoute('/add') }}>新增</p>
          </div>
          <div className="listBox">
            <div className="firstTitle">
              <div style={{ width: '1.4667rem' }}>region</div>
              <div style={{ width: '3.3067rem' }}>name</div>
              <div style={{ width: '4.2667rem' }}>roomId</div>
              <div style={{ width: '5.6rem' }}>channel</div>
              <div style={{ width: '3.2rem' }}>signTime</div>
              <div style={{ width: '3.2rem' }}>subTime</div>
              <div style={{ width: '3.2rem' }}>reception</div>
              <div style={{ width: '3.2rem' }}>original</div>
              <div style={{ width: '4.5333rem' }}>passport</div>
              <div style={{ width: '5.8667rem', borderRight: '0.0267rem solid #bcbcbc' }}>handle</div>
            </div>
            {
              userInfo.map((item, index) => (
                <div className="listUser" key={index}>
                  <div style={{ width: '1.4667rem' }}>{item.region}</div>
                  <div style={{ width: '3.3067rem' }}>{item.name}</div>
                  <div style={{ width: '4.2667rem' }}>{item.roomId}</div>
                  <div style={{ width: '5.6rem' }}>{item.channel}</div>
                  <div style={{ width: '3.2rem' }}>{item.signTime}</div>
                  <div style={{ width: '3.2rem' }}>{item.subTime}</div>
                  <div style={{ width: '3.2rem' }}>{item.reception}</div>
                  <div style={{ width: '3.2rem' }}>{item.original}</div>
                  <div style={{ width: '4.5333rem' }}>{item.passport}</div>
                  <div className="handleBtn">
                    <p
                      style={{ background: '#20a0ff', marginRight: '0.4rem' }}
                      onClick={() => { Router.pushRoute(`/add?editIndex=${index}`) }}
                    >编辑</p>
                    <p style={{ background: '#FF5050' }} onClick={() => { this.delItem(index) }}>删除</p></div>
                </div>
              ))
            }
          </div>
        </ListCon>
      </Provider >
    )
  }
}

