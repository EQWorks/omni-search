import React, { useState } from 'react'

import useFuse from '../src/fuse-hook'
import FuzzySearch from '../src/mui-marketplace-search'
import { data } from './data/marketplace-api'
import algoliasearch from 'algoliasearch'
import useAlgolia from '../src/algolia-hook'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

// eslint-disable-next-line react/prop-types
const Container = ({ children }) => (
  <div
    style={{
      minHeight: 300,
      backgroundColor: 'lightBlue',
      display: 'flex',
      alignItems: 'center',
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
  decorators: [storyFn => <Container>{storyFn()}</Container>],
}

export const standard = () => {

  // function that receives "event" to be used 
  const onChange = ({ target: { value } }) => {
    /* eslint-disable-next-line */
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
        results.map((result, i) => (
          <div style={{ backgroundColor: 'white', margin: 5 }}  key={i}>
            <p>{result.item.meta.name}</p>
            <p>Type: {result.item.type}</p>
            <p>{result.item.meta.description}</p>
          </div>
        ))
      }
    </>
  )

}

export const withAlgoliaHook = () => {
  const { search, results } = useAlgolia({
    indexName: 'marketplace',
    searchAPIkey: process.env.REACT_APP_ALGOLIA_SEARCH_KEY,
    specs: { exactOnSingleWordQuery: 'word' },
  })

  return (
    <>
      <FuzzySearch onChange={({ target: { value } }) => (search(value))} />
      {results.map((result, i) => (
        <div style={{ backgroundColor: 'white', margin: 5 }} key={i}>
          <p>{result.meta.name}</p>
          <p>Type: {result.type}</p>
          <p>{result.meta.description}</p>
        </div>
      ))
      }
    </>
  )

}
export const withAlgoliaSuggestions = () => {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState([])
  const [suggestions, setSuggestions] = useState([])

  const client = algoliasearch(
    process.env.REACT_APP_ALGOLIA_APP_ID,
    process.env.REACT_APP_ALGOLIA_SEARCH_KEY,
  )

  // setup for querying multiple indexes
  const queries = [{
    indexName: 'marketplace',
    query: query,
    // params: {}
  }, {
    indexName: 'marketplace_query_suggestions',
    query: query,
    // params: {}
  },
  ]

  const handleChange = ({ target: { value } }) => {
    setQuery(value)
    if (value === '') {
      setResult([])
      setSuggestions([])
    } else {
      client.multipleQueries(queries).then(({ results }) => {
        // console.log(results)
        setResult(results[0].hits)
        setSuggestions(results[1].hits)
      })
    }
  }

  return (
    <>
      <FuzzySearch onChange={handleChange} value={query} />
      {suggestions.length !== 0 && (
        <div style={{
          backgroundColor: 'orange',
          position: 'absolute',
          top: '60px',
          width: 240,
          height: 'auto',
          zIndex: 10,
        }}>
          {suggestions.map((suggestion) => {
            return suggestion.marketplace.facets.exact_matches.category.map((category, i) => {
              const innerText = `${suggestion._highlightResult.query.value} in ${category.value}`
              return (
                <div
                  key={i}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    client.initIndex('marketplace').search(suggestion.query, { facetFilters: `category: ${category.value}` })
                      .then(({ hits }) => {
                        // console.log(hits)
                        setResult(hits)
                        setQuery(suggestion.query)
                        setSuggestions([])
                      })
                      .catch((e) => console.error(e))
                  }}
                  dangerouslySetInnerHTML={{ __html: innerText }} 
                >
                  {/* {suggestion.query} in {category.value} */}
                </div>
              )
            })
          })}
        </div>)}
      <Grid container >
        {result.map((result) => (
          <Grid item key={result.objectID}>
            <Card style={{ backgroundColor: 'white', margin: 5, width: 300 }}>
              <CardContent>
                <Typography >{result.meta.name}</Typography>
                <Typography>Type: {result.type} Category: {result.category}</Typography>
                <Typography>{result.meta.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))
        }
      </Grid>
    </>
  )

}
