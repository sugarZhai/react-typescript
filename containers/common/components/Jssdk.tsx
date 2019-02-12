import React, { Component } from 'react'
import { loadThirdPartyScript } from '../utils'
declare const wx: any
class Jssdk extends Component<any> {
  componentDidMount() {
    // loadJssdk(this.props.onReady);
    this.loadJssdk(this.props.onReady, [])
  }
  getJsConfig = (onReady) => {
    const resultPromise = fetch('https://wechat.zhongan.com/open/index.php?r=ajax/jsSign', {
      body: JSON.stringify({
        gzh: 'airSupply', // 马上飞公众号
        url: window.location.href,
      }),
      method: 'post',
      mode: 'cors',
    }).then(re => re.json())
    resultPromise.then((re) => {
      const  result  = re && re.result ? re.result : {}
      wx.config({
        debug: false,
        appId: result.appid,
        timestamp: result.timestamp,
        nonceStr: result.noncestr,
        signature: result.signature,
        jsApiList: ['onMenuShareTimeline',
          'onMenuShareAppMessage',
          'hideMenuItems',
          'addCard',
          'getLocation',
        ],
        fail: (res) => {
          console.log(JSON.stringify(res))
        },
      })

      wx.ready(() => {
        // alert('ready');
        // wx.onMenuShareTimeline({
        //   title: '123', // 分享标题
        //   link: 'https://tac-air.zhongan.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        //   imgUrl: '', // 分享图标
        //   success() {
        //       // 用户确认分享后执行的回调函数
        //   },
        //   cancel() {
        //       // 用户取消分享后执行的回调函数
        //   }
        // });
        console.log('wx ready')
        onReady(wx)
      })
    })
  }
  loadJssdk(onReady, []) {
    const src = '//res.wx.qq.com/open/js/jweixin-1.3.2.js'
    loadThirdPartyScript(src, () => {
      this.getJsConfig(onReady)
    })
  }
  render() {
    return (
      <div />
    )
  }
}
export default Jssdk
