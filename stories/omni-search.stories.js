import React, { useState, useEffect } from "react"
import PropTypes from 'prop-types'

import useAlgolia from '../src/algolia-hook'
import OmniSearch from "../src/mui-search-bar"
import SearchIcon from '@material-ui/icons/Search'


const Container = ({ children }) => (
  <div
    style={{
      height: 300,
      backgroundColor: 'black',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'

    }}
  >
    {children}
  </div>
)

Container.propTypes = { children: PropTypes.object }
Container.defaultProps = { children: null }


const hookSetup = () => {
  const specs = {
    hitsPerPage: 50,
    getRankingInfo: true,
    restrictSearchableAttributes: ['name', 'id'],
    exactOnSingleWordQuery: 'word',
  }

  const { debouncedSearch, results } = useAlgolia({
    searchAPIkey: process.env.REACT_APP_ALGOLIA_SEARCH_KEY,
    specs
  })

  return { debouncedSearch, results }
}

export default {
  component: OmniSearch,
  title: 'OmniSearch',
  decorators: [storyFn => <Container>{storyFn()}</Container>]
}

export const standard = () => {
  const { debouncedSearch, results } = hookSetup()

  return (
    <OmniSearch {... { debouncedSearch, results }} />
  )
}

export const withSelectedItem = () => {
  const [selection, setSelection] = useState({})

  const { debouncedSearch, results } = hookSetup()

  useEffect(() => {
    console.log('item selected', selection)
  }, [selection]);

  return (
    <OmniSearch {... { debouncedSearch, results, getSelection: setSelection }} />
  )
}

export const customProps = () => {
  const { debouncedSearch, results } = hookSetup()

  return (
    <OmniSearch {... {
      debouncedSearch,
      results,
      autocompleteProps: {
        autoHighlight: true,
        clearOnBlur: true,
        renderOption: (option) => (option.name)
      },
      inputProps: { startAdornment: <SearchIcon /> }
    }}
    />
  )
}
