import { CSSTransition } from 'react-transition-group'
import styled from 'styled-components'

import { toggleForbidScrollThrough } from '../utils'
const duration = 300

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  z-index: 999;
  flex-direction: column;
  justify-content: flex-end;
  .overlay {
    transition: all ${duration}ms ease-out;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    z-index: 1;
  }
  &.transition-enter {
    .overlay {
      opacity: 0;
    }
    .modal-content {
      opacity: 0;
      transform: translate(0, 100%);
    }
  }
  &.transition-enter-active {
    .overlay {
      opacity: 1;
    }
    .modal-content {
      opacity: 1;
      transform: translate(0, 0);
    }
  }

  &.transition-exit-active {
    .overlay {
      opacity: 0;
    }
    .modal-content {
      opacity: 0;
      transform: translate(0, 100%);
    }
  }
  .modal-content {
    transition: all ${duration}ms;
    z-index: 2;
    >div {
      -webkit-overflow-scrolling: touch;
    }
  }
  h3 {
    height: 1.3333rem;
    line-height: 1.3333rem;
    display: flex;
    padding: 0 0.4267rem;
    box-sizing: border-box;
    background-color: #fff;
    span {
      color: #464646;
      font-size: 0.4267rem;
      flex: 1 1 8rem;
    }
    i {
      flex: 0 0 .28rem;
      font-size: 0.48rem;
      color: #bcbcbc;
    }
  }
`

interface Props {
  show: boolean,
  title: string,
  children: any,
  onClose?: () => any,
}

const Popup = ({ show, children, title, onClose }: Props) => {
  if (typeof window !== 'undefined') {
    toggleForbidScrollThrough(show)
  }
  return (
    <CSSTransition in={show} timeout={duration} classNames="transition" unmountOnExit>
      <Container>
        <div className="overlay" onClick={onClose} ></div>
        <div className="modal-content">
          <h3><span>{title}</span><i onClick={onClose} className="iconfont icon-close"></i></h3>
          {children}
        </div>
      </Container>
    </CSSTransition>
  )
}

export default Popup
