import { CSSTransition } from 'react-transition-group'
import styled from 'styled-components'
import { toggleForbidScrollThrough } from '../utils'

const duration = 300

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
      transform: translate(0, 10%);
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
      transform: translate(0, -30%);
    }
  }
  .modal-content {
    transition: all ${duration}ms;
    flex: 1 1;
    z-index: 2;
    position: relative;
    -webkit-overflow-scrolling: touch;
    >div {
      margin: 0 auto;
      -webkit-overflow-scrolling: touch;
    }
    .btn-closed {
      margin: .4rem auto 0;
      color: #fff;
      text-align: center;
      i {
        display: inline-block;
        border: 1px solid #fff;
        font-size: 0.7rem;
        width: .8rem;
        height: .8rem;
        line-height: .8rem;
        border-radius: 50% 50%;
      }
    }
  }

`

interface Props {
  show: boolean,
  children: any,
  zIndex?: number,
  overlayBgStyle?: string,
  onClose?: () => any,
  hideCloseBtn?: boolean,
}

const Modal = ({ show, children, onClose, hideCloseBtn, zIndex = 999,
   overlayBgStyle = 'rgba(0, 0, 0, .5)' }: Props) => {
  if (typeof window !== 'undefined') {
    toggleForbidScrollThrough(show)
  }
  return (
    <CSSTransition in={show} timeout={duration} classNames="transition" unmountOnExit>
      <Container style={{zIndex}}>
        <div className="overlay" onClick={onClose} style={{backgroundColor: overlayBgStyle}} ></div>
        <div className="modal-content">
          {children}
          {!hideCloseBtn && <div className="btn-closed"><i onClick={onClose} className="iconfont icon-close"></i></div>}
        </div>
      </Container>
    </CSSTransition>
  )
}

export default Modal
