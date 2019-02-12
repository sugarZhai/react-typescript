import styled from 'styled-components'
import React, { Component } from 'react'
import CommonStore from '../../store/common'
import { inject, observer } from 'mobx-react'
const ErrorContainer = styled.div`
width:10rem;
text-align:center;
  .tipsErrorBox{
    width: 100%;
    position: fixed;
    top: 5%;
    z-index: 999;
    text-align: center;
    >div{
      padding: 0.32rem 0.4533rem;
      line-height: 0.5333rem;
      font-size: 0.3733rem;
      background-color: rgba(0, 0, 0, 0.7);
      color: #fff;
      border-radius: 8px;
      margin:70% auto 0;
      max-width:60%;
      display: inline-block;
    }
  }
  .noShow{
    display:none;
  }
`
@inject('commonStore')
@observer
class Toast extends Component<any> {
  render() {
    const toastMsg = CommonStore.returnMsg
    return (
      <ErrorContainer >
        <div className={(toastMsg && toastMsg !== '') ? 'tipsErrorBox' : 'noShow'}>
          <div>{toastMsg}</div>
        </div>
      </ErrorContainer >
    )
  }
}
export default Toast
