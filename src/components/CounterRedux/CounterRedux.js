import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/counterActions'
const delay = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 1000)
  })
}
class CounterRedux extends Component {
  constructor (props) {
    super(props)
    this.increment = this.increment.bind(this)
    this.incAsync = this.incAsync.bind(this)
    this.asyncAction = this.asyncAction.bind(this)
    this.state = {
      incrementing: false
    }
  }

  componentDidMount () {
    this.props.increment()
  }
  increment = () => {
    this.props.increment()
  }

  incAsync = async () => {
    this.setState({
      incrementing: true
    })
    await delay()
    this.props.increment()

    this.setState({
      incrementing: false
    })
  }

  asyncAction = () => {
    this.props.incAsync()
  }

  render () {
    return (
      <>
        <h2>Redux</h2>
        <button onClick={this.increment}>Increment</button>
        <button onClick={this.incAsync}>Increment Async</button>
        <button onClick={this.asyncAction}>Increment with Async Action</button>
        <div>{this.props.counter.number}</div>
        <p>Local component incrementing state </p>
        {this.state.incrementing ? <h3>Incrementing Counter...</h3> : null}
        <p>{this.props.counter.number}</p>

        <p>Reducer incrementing state </p>
        {this.props.counter.incrementing ? (
          <h3>Incrementing Counter...</h3>
        ) : null}
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    counter: state.counter
  }
}
export default connect(
  mapStateToProps,
  actions
)(CounterRedux)
