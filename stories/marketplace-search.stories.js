import React, { useState, useEffect } from "react"

import FizzySearch from '../src/mui-marketplace-search'


const Container = ({ children }) => (
  <div
    style={{
      height: 300,
      backgroundColor: 'lightBlue',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'

    }}
  >
    {children}
  </div>
)

export default {
  component: FizzySearch,
  title: 'FizzySearch Marketplace',
  decorators: [storyFn => <Container>{storyFn()}</Container>]
}

export const standard = () => {

  // function that receives "event" to be used 
  const onChange = ({target: {value}}) => {
    console.log(value)
  }

  return (
    <FizzySearch {...{onChange}} />
  )
}
