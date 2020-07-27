import React, { useState } from "react"

import useFuse from '../src/fuse-hook'
import MarketplaceSearch from '../src/mui-marketplace-search'
import { data } from './data/marketplace-api'
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
  component: MarketplaceSearch,
  title: 'Marketplace Search',
  decorators: [storyFn => <Container>{storyFn()}</Container>],
}

export const Default = () => {
  const [search, setSearch] = useState('')
  const fuse = useFuse(data)
  const [results, setResults] = useState([])

  const onKeyPress = (term) => {
    setResults(fuse.search(term))
  }

  return (
    <>
      <MarketplaceSearch
        setSearch={setSearch}
        search={search}
        updateHistory={onKeyPress}
      />
      <Typography>Press <strong>ENTER</strong> key to trigger the search</Typography>
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
        ))}
      </Grid>
    </>
  )
}

export const FuseAndQueryParam = () => {
  const fuse = useFuse(data)
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])
  const [mockParam, setMockParam] = useState('')
  const urlParams = new URLSearchParams(document.location.search)

  const updateHistory = (term) => {
    setResults(fuse.search(term))
    urlParams.set('query', term)
    setMockParam(urlParams.get('query'))
  }

  return (
    <>
      <MarketplaceSearch
        setSearch={setSearch}
        search={search}
        updateHistory={updateHistory}
      />
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

FuseAndQueryParam.story = {
  decorators: [withQuery],
}
