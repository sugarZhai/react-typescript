import styled, { keyframes } from 'styled-components'
import { Component } from 'react'
import { inject, observer } from 'mobx-react'

const loadingColor = '#ccc'
const Container = styled.div`
  z-index: 999999;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  p {
    color: ${loadingColor};
    text-align: center;
    margin-top: .6em;
    font-size: .8em;
  }
  .wrap {
    background-color: rgba(0,0,0,.7);
    padding: .6em 1em;
    border-radius: 8px;
  }
  .loader {
    width: 2em;
    height: 2em;
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cdefs%3E%3Cpath id='a' stroke='%23fff' stroke-width='11' stroke-linecap='round' d='M60 7v20'/%3E%3C/defs%3E%3Cuse xlink:href='%23a' opacity='.27'/%3E%3Cuse xlink:href='%23a' opacity='.27' transform='rotate(30 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.27' transform='rotate(60 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.27' transform='rotate(90 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.27' transform='rotate(120 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.27' transform='rotate(150 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.37' transform='rotate(180 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.46' transform='rotate(210 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.56' transform='rotate(240 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.66' transform='rotate(270 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.75' transform='rotate(300 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.85' transform='rotate(330 60 60)'/%3E%3C/svg%3E");
    margin: 0 auto;
    background-size: 100%;
    background-position: 50% center;
    background-repeat: no-repeat;
    animation: spinner-anime 1s steps(12, end) 0s infinite normal none running;
  }
  @keyframes spinner-anime {
    to {
        -webkit-transform: rotate(1turn);
        transform: rotate(1turn)
    }
  }
`

interface Props {
  commonStore?: any,
}
@inject('commonStore')
@observer
class Loading extends Component<Props> {
  render() {
    const { loading, loadingStyled, loadingTxt } = this.props.commonStore
    return (
      <>
        {loading ? (
          <Container className="content-full" style={loadingStyled}>
            <div className="wrap">
              <div className="loader"></div>
              <p>{loadingTxt}</p>
            </div>
          </Container>
        ) : ''}
      </>
    )
  }
}
export default Loading
