import React from 'react'

interface Props {
  userAgent: string
}

export default class extends React.Component <Props> {
   static async getInitialProps({ req }) {
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
    return { userAgent }
  }

   render() {
    return (
      <div>
        Hello World {this.props.userAgent}
      </div>
    )
  }
}
