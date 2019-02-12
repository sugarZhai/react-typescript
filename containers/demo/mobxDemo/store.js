import { observable, action } from 'mobx'

class CounterStore {
  @observable counter = 0

  @action
  increment() {
    this.counter ++
  }

  @action
  doubleAsync() {
    return new Promise((resolve) => {
      setTimeout(action('double', () => {
        this.counter = this.counter * 2
        resolve()
      }), 200)
    })
  }
}

export default new CounterStore()
