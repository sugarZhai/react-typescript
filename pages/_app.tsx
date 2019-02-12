import App, { Container } from 'next/app'
import * as React from 'react'
import { Provider, useStaticRendering } from 'mobx-react'
import { Router } from '../containers/routes'
import { reInitIlog } from '../containers/common/utils'
import rootStore from '../containers/store'
import Toast from '../containers/common/components/Toast'
import Loading from '../containers/common/components/Loading'
import './null.css' // fixed nextjs v7 bug. see here: https://github.com/zeit/next.js/issues/5291

declare const window: Window & {
  _za: {
    pushData: () => {},
    init: () => {},
  },
}
export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}
    if (typeof window === 'undefined') {
      useStaticRendering(true)
    }
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return { pageProps }
  }
  constructor(props) {
    super(props)
    const { commonStore } = rootStore
    commonStore.initialize()
  }
  componentDidMount() {
    Router.onRouteChangeComplete = () => {
      window._za.pushData()
      window._za.init()
    }
    reInitIlog()
  }

  render() {
    const { Component, pageProps } = this.props
    return <Container>
      <Provider {...rootStore}>
        <div id="root">
          <Component {...pageProps} />
          <Toast />
          <Loading />
        </div>
      </Provider>
    </Container>
  }
}

