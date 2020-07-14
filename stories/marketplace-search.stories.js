import React, { useState, useEffect } from "react"

import useFuse from '../src/fuse-hook'
import FuzzySearch from '../src/mui-marketplace-search'
import Fuse from 'fuse.js'
import { data } from '../src/constants/marketplace-api'
import useAlgolia from '../src/algolia-hook'


const Container = ({ children }) => (
  <div
    style={{
      minHeight: 300,
      backgroundColor: 'lightBlue',
      display: 'flex',
      alignItems: 'center',
      // justifyContent: 'center',
      flexDirection: 'column',
      padding: 10,
    }}
  >
    {children}
  </div>
)

export default {
  component: FuzzySearch,
  title: 'FuzzySearch Marketplace',
  decorators: [storyFn => <Container>{storyFn()}</Container>]
}

export const standard = () => {

  // function that receives "event" to be used 
  const onChange = ({ target: { value } }) => {
    console.log(value)
  }

  return (
    <FuzzySearch {...{ onChange }} />
  )
}

export const withFuse = () => {
  const fuse = useFuse(data)
  const [results, setResults] = useState([])

  const onChange = ({ target: { value } }) => {
    setResults(fuse.search(value))
  }

  return (
    <>
      <FuzzySearch {...{ onChange }} />
      {results.length !== 0 &&
        results.map((result) => (
          <div style={{backgroundColor: 'white', margin: 5}}>
            <p>{result.item.meta.name}</p>
            <p>Type: {result.item.type}</p>
            <p>{result.item.meta.description}</p>
          </div>
        ))
      }
    </>
  )

}

export const withAlgolia = () => {
  const { search, results } = useAlgolia({
    indexName: 'marketplace',
    searchAPIkey: process.env.REACT_APP_ALGOLIA_SEARCH_KEY,
    specs: {exactOnSingleWordQuery: 'word'}
  })

  return (
    <>
      <FuzzySearch onChange={({ target: { value } }) => (search(value))} />
        {results.map((result) => (
          <div style={{backgroundColor: 'white', margin: 5}}>
            <p>{result.meta.name}</p>
            <p>Type: {result.type}</p>
            <p>{result.meta.description}</p>
          </div>
        ))
      }
    </>
  )

}