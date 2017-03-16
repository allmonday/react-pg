import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { createStore } from 'redux'
import Counter from './view/Counter'
import counter from './store'

const store = createStore(counter)
const rootEl = document.getElementById('app')

const render = () => ReactDOM.render(
  <Counter
    value={store.getState()}
    onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
    onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
  />,
  rootEl
)

render()
store.subscribe(render)