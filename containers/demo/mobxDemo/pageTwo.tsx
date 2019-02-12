import { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Router from 'next/router'

@inject('countStore')
@observer
class MobxTestTwo extends Component<any> {
  render() {
    const { countStore } = this.props
    return (
      <div>
        <h1>页面2</h1>
        <div>{countStore.counter}</div>
        <div onClick={() => {countStore.increment()}}>+1</div>
        <div onClick={() => {Router.push({pathname: '/demo/mobxDemo/pageOne'})}}>跳转到页面1</div>
      </div>
    )
  }
}

export default MobxTestTwo
