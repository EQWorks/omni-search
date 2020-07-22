import React, { useState } from 'react'
import PropTypes from 'prop-types'

import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import { makeStyles } from '@material-ui/core/styles'
// import { useHistory } from 'react-router-dom'
import { useQueryParam, StringParam } from 'use-query-params'
// import useFuse from './fuse-hook'

// ATTENTION needs to add query-param provider to index.js where <App/> is being mounted https://www.npmjs.com/package/use-query-params?activeTab=readme

const useStyles = makeStyles((theme) => {
  // const theme = {
  //   ...t,
  //   typography: {
  //     ...t.typography,
  //     ...typography,
  //   },
  //   palette: {
  //     ...t.palette,
  //     ...palette,
  //   },
  // }

  return {
    input: {
      backgroundColor: 'white',
      borderRadius: '25px',
      padding: theme.spacing(0.75, 2),
      width: '270px',
      height: '40px',
      border: '1px solid grey',
    },
  }
})

const MarketplaceSearch = ({ ...props }) => {
  const classes = useStyles()
  // const history = useHistory()
  const [query = '', setQuery] = useQueryParam('query', StringParam)
  // const fuse = useFuse(data)
  // const [results, setResults] = useState([])

  const onChange = ({ target: { value } }) => {
    setQuery(value)
    // setResults(fuse.search(value))
  }


  return (
    <div>
      < InputBase
        type="text"
        inputProps={{ 'aria-label': 'search marketplace' }}
        className={classes.input}
        placeholder='Search'
        fullWidth
        endAdornment={<SearchIcon />}
        onChange={onChange}
        value={query}
        {...props}
      />

    </div>
  )
}

MarketplaceSearch.propTypes = { onChange: PropTypes.func.isRequired }

export default MarketplaceSearch
