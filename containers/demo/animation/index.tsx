import React from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import styled from 'styled-components'

const Container = styled.div`
  .example-enter {
    opacity: 0.01;
  }

  .example-enter.example-enter-active {
    opacity: 1;
    transition: opacity 500ms ease-in;
  }

  .example-exit {
    opacity: 1;
  }

  .example-exit.example-exit-active {
    opacity: 0.01;
    transition: opacity 300ms ease-in;
  }
`
class TodoList extends React.Component {
  state = {
    items: [],
  }
  constructor(props) {
    super(props)
    this.state = { items: ['hello', 'world', 'click', 'me'] }
    this.handleAdd = this.handleAdd.bind(this)
  }

  handleAdd() {
    const newItems = this.state.items.concat([
      prompt('Enter some text'),
    ])
    this.setState({ items: newItems })
  }

  handleRemove(i) {
    const newItems = this.state.items.slice()
    newItems.splice(i, 1)
    this.setState({ items: newItems })
  }

  render() {
    const items = this.state.items.map((item, i) => (
      <CSSTransition
        key={i}
        classNames="example"
        timeout={{ enter: 500, exit: 300 }}>
        <div key={item} onClick={() => this.handleRemove(i)}>
          {item}
        </div>
      </CSSTransition>
    ))

    return (
      <Container>
        <button onClick={this.handleAdd}>Add Item</button>
        <TransitionGroup
          classNames="example"
          timeout={500}>
          {items}
        </TransitionGroup>
      </Container>
    )
  }
}

export default TodoList
