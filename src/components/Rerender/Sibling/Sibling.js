import React from 'react'
let render_count = 1
const Sibling = props => (
  <p>Sibling should render only once: {render_count++}</p>
)
export default Sibling
