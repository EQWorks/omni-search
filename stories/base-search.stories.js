import React, { useState } from "react"

import useFuse from '../src/fuse-hook'
import BaseSearch from '../src/base-search'
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
  component: BaseSearch,
  title: 'Base Search',
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
