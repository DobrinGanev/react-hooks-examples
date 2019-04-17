import React from 'react'
import Sibling from '../Sibling'
import ChildConsumer from '../ConsumerChild'

class Parent extends React.PureComponent {
  render () {
    return (
      <>
        <ChildConsumer />
        <Sibling />
      </>
    )
  }
}

export default Parent

/**
 *  this will rerender the Sibling even if is not consumer
 const Parent = () => {
  return (
    <>
      <ChildConsumer />
      <Sibling />
    </>
  )
}

 *
 */
