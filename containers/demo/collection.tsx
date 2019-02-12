import React from 'react'
import styled from 'styled-components'
import CommonStore from '../store/common'
import { inject, observer } from 'mobx-react'
import Modal from '../common/components/Modal'
import Toast from '../common/components/Toast'

const Container = styled.div`
  button {
    display: block;
    border: none;
    width: 88%;
    background-color: #34bd6c;
    padding: 0.1333rem 0.2133rem;
    color: #fff;
    margin: 0.2667rem auto;
    font-size: 18px;
  }
`
const ModalBody = styled.div`
  background-color: #fff;
  padding: 0.2667rem;
  width: 88%;
  margin: 0 auto;
`
@inject('commonStore')
@observer
class Collection extends React.Component<any> {
  state = {
    showModal: false,
  }
  toggleModal = () => {
    const { showModal } = this.state
    this.setState({
      showModal: !showModal,
    })
  }
  showToast() {
    CommonStore.returnMsg = '我是弹窗信息'
  }
  render() {
    const { showModal } = this.state
    const { commonStore } = this.props
    return (
      <Container>
        <button onClick={this.toggleModal}>Modal弹窗</button>
        <button onClick={this.showToast}>改变公共CommonStore.returnMsg给Toast传入弹窗信息</button>
        <Toast returnMsg={commonStore.returnMsg}>Toast弹窗</Toast>
        <Modal show={showModal} onClose={this.toggleModal}>
          <ModalBody>
            this is Modal Body...
          </ModalBody>
        </Modal>
      </Container>
    )
  }
}
export default Collection
