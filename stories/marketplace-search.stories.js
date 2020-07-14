import React, { useState, useEffect } from "react"

import useFuse from '../src/fuse-hook'
import FizzySearch from '../src/mui-marketplace-search'
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
  component: FizzySearch,
  title: 'FizzySearch Marketplace',
  decorators: [storyFn => <Container>{storyFn()}</Container>]
}

export const standard = () => {

  // function that receives "event" to be used 
  const onChange = ({ target: { value } }) => {
    console.log(value)
  }

  return (
    <FizzySearch {...{ onChange }} />
  )
}

export const withFuse = () => {
  const [value, setValue] = useState('')
  // const {search, options} = useFuse(data)
  const [results, setResults] = useState([])

  useEffect(() => {
    const options = {
      shouldSort: true,
      tokenize: true,
      matchAllTokens: true,
      threshold: 0.3,
      keys: [
        'meta.name',
        'category',
        'vendor_name',
        'vendor_description',
        'meta.description',
      ],
    }
    const fuse = new Fuse(data, options)
    setResults(fuse.search(value))
  }, [value])


  const onChange = ({ target: { value } }) => {
    setValue(value)
  }

  return (
    <>
      <FizzySearch {...{ onChange }} />
      {results.length !== 0 &&
        results.map((result) => (
          <div style={{backgroundColor: 'white', margin: 5}}>
            <p>{result.item.meta.name}</p>
            <p>{result.item.meta.description}</p>
          </div>
        ))
      }
    </>
  )

}

export const withAlgolia = () => {
  // const [value, setValue] = useState();

  const { search, results } = useAlgolia({
    indexName: 'marketplace',
    searchAPIkey: process.env.REACT_APP_ALGOLIA_SEARCH_KEY,
    specs: {exactOnSingleWordQuery: 'word'}
  })

  return (
    <>
      <FizzySearch onChange={({ target: { value } }) => (search(value))} />
      {/* {results.length !== 0 && */}
        {results.map((result) => (
          <div style={{backgroundColor: 'white', margin: 5}}>
            {/* {console.log(result)} */}
            <p>{result.meta.name}</p>
            <p>{result.category}</p>
            <p>{result.meta.description}</p>
          </div>
        ))
      }
    </>
  )

}