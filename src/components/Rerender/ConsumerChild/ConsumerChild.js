import React, { useContext } from 'react'
import { RerenderContext } from '../../../App'

const ConsumerChild = props => {
  const count = useContext(RerenderContext)
  return <div>Consumer that should update every time count {count}</div>
}
/*
or render the prop function
const ConsumerChild = props => {
  return (
    <RerenderContext.Consumer>
      {count => <p>{'count: ' + count}</p>}
    </RerenderContext.Consumer>
  )
}
*/
export default ConsumerChild
