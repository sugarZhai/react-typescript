import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import remCalculate from '../containers/common/utils/remCalculate'
import { gwPath, env } from '../config/env'

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }
  render() {
    return (
      <html lang="zh">
        <Head>
          <link rel="dns-prefetch" href="//tac-cdn.zhongan.com" />
          <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover" />
          <link rel="stylesheet" type="text/css" href={`${gwPath}/static/css/common.css`} />
          <link rel="stylesheet" type="text/css" href="//at.alicdn.com/t/font_737420_l8g85k0m7o.css" />
          <script dangerouslySetInnerHTML={{ __html: remCalculate }} />
          <script dangerouslySetInnerHTML={{ __html: `window.DEPLOY_ENV='${env}';` }} />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
          <script src="//static.zhongan.com/website/public/js/ilog/dist/ilog.min.js" />
          {
            env !== 'prd' ? ([
              <script src="//cdn.jsdelivr.net/npm/eruda"></script>,
              <script>eruda.init();</script>,
            ]) : ''
          }
        </body>
      </html>
    )
  }
}
