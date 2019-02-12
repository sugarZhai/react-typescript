import { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Router from 'next/router'

@inject('commonStore', 'countStore')
@observer
class MobxTestOne extends Component<any> {
  render() {
    const { countStore, commonStore } = this.props
    return (
      <div>
        <h1>页面1</h1>
        <h2>{commonStore.name}</h2>
        <h4 onClick={() => {commonStore.changeName()}}>change name</h4>
        <div>{countStore.counter}</div>
        <div onClick={() => {countStore.increment()}}>+1</div>
        <div onClick={() => {Router.push({pathname: '/demo/mobxDemo/pageTwo'})}}>跳转到页面2</div>
      </div>
    )
  }
}

export default MobxTestOne
