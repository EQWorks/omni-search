import React, { useState } from 'react'

import useFuse from '../src/fuse-hook'
import BaseSearch from '../src/base-search'
// import MarketplaceSearch from '../src/mui-marketplace-search'
import { data } from './data/marketplace-api'
import algoliasearch from 'algoliasearch'
import useAlgolia from '../src/algolia-hook'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import { withQuery } from '@storybook/addon-queryparams'

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
  component: BaseSearch,
  title: 'Marketplace Search',
  decorators: [storyFn => <Container>{storyFn()}</Container>],
}

export const Default = () => {

  // function that receives "event" to be used
  const onChange = ({ target: { value } }) => {
    /* eslint-disable-next-line */
    console.log(value)
  }

  return (
    <BaseSearch {...{ onChange }} />
  )
}

export const FuzzySearchWithFuse = () => {
  const fuse = useFuse(data)
  const [results, setResults] = useState([])

  const onChange = ({ target: { value } }) => {
    setResults(fuse.search(value))
  }

  return (
    <>
      <BaseSearch {...{ onChange }} />
      <Grid container >
        {results.map((result) => (
          <Grid item key={result.item.market_id}>
            <Card style={{ backgroundColor: 'white', margin: 5, width: 300 }}>
              <CardContent>
                <Typography >{result.item.meta.name}</Typography>
                <Typography>Type: {result.item.type} Category: {result.item.category}</Typography>
                <Typography>{result.item.meta.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))
        }
      </Grid>
    </>
  )
}

export const FuseAndEnterKeyAndQueryParam = () => {
  const fuse = useFuse(data)
  const [results, setResults] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [mockParam, setMockParam] = useState('')
  const onChange = ({ target: { value } }) => {
    setSearchTerm(value)
  }
  const urlParams = new URLSearchParams(document.location.search)

  const onKeyPress = (event) => {
    if (event.which === 13 || event.keyCode === 13) {
      setResults(fuse.search(searchTerm))
      urlParams.set('query', searchTerm)
      setMockParam(urlParams.get('query'))
    }
  }

  return (
    <>
      <BaseSearch {...{ onChange, onKeyPress, value: searchTerm }} />
      <Typography>Press <strong>ENTER</strong> key to trigger the search</Typography>
      <Typography color='secondary'>query string param in url: {mockParam}</Typography>
      <Grid container >
        {results.map((result) => (
          <Grid item key={result.item.market_id}>
            <Card style={{ backgroundColor: 'white', margin: 5, width: 300 }}>
              <CardContent>
                <Typography >{result.item.meta.name}</Typography>
                <Typography>Type: {result.item.type} Category: {result.item.category}</Typography>
                <Typography>{result.item.meta.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))
        }
      </Grid>
    </>
  )
}

FuseAndEnterKeyAndQueryParam.story = {
  decorators: [withQuery],
}

export const withAlgoliaHook = () => {
  const { search, results } = useAlgolia({
    indexName: 'marketplace',
    searchAPIkey: process.env.REACT_APP_ALGOLIA_SEARCH_KEY,
    specs: { exactOnSingleWordQuery: 'word' },
  })

  return (
    <>
      <BaseSearch onChange={({ target: { value } }) => (search(value))} />
      <Grid container >
        {results.map((result) => (
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
      <BaseSearch onChange={handleChange} value={query} />
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
