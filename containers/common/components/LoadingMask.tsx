import styled from 'styled-components'
import { toggleForbidScrollThrough } from '../utils'

const Container = styled.div`
  background-color: rgba(255, 255, 255, 1);
  z-index: 999999;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 0.9067rem;
  .circular {
    width: 1em;
    height: 1em;
    margin-bottom: 0.6rem;
    animation: Rotate 2s linear infinite;
  }
  .path {
    animation: Dash 1.5s ease-in-out infinite;
    stroke-dasharray: 90,150;
    stroke-dashoffset: 0;
    stroke-width: 2;
    stroke: #409eff;
    stroke-linecap: round;
  }
  p {
    font-size: 0.32rem;
    color:  #464646;
    padding: 0 .4rem;
    text-align: center;
    line-height: 1.6;
  }
  @keyframes Rotate {
    100% {
      transform: rotate(1turn);
    }
  }
  @keyframes Dash {
    0% {
      stroke-dasharray: 1,200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90,150;
      stroke-dashoffset: -40px;
    }
    to {
      stroke-dasharray: 90,150;
      stroke-dashoffset: -120px;
    }
  }
`

const LoadingMask = ({ show, loadingStyled = {}, loadingTxt = '请稍候'}) => {
  if (typeof window !== 'undefined') {
    toggleForbidScrollThrough(show)
  }
  return (
    <>
      {show ? (
        <Container className="content-full" style={loadingStyled}>
          <svg viewBox="25 25 50 50" className="circular">
            <circle cx="50" cy="50" r="20" fill="none" className="path"></circle>
          </svg>
          <p>{loadingTxt}</p>
        </Container>
      ) : ''}
    </>
  )
}
export default LoadingMask
