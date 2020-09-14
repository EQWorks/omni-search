import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import { makeStyles } from '@material-ui/core/styles'

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
      padding: theme.spacing(0.75, 0, 0.75, 2),
      width: '270px',
      height: '40px',
      border: '1px solid grey',
    },
    iconRoot: { padding: '10px' },
  }
})

/**
 * MarketplaceSearch Component - locus tailored, MUI parity
 * @function MarketplaceSearch
 * @param {function} setSearch - from useState
 * @param {string} search - from useState
 * @param {function(term): void} updateHistory - invoked inside onKeyPress
 * @param {...object} props - any InputBase props to override default
 */

const MarketplaceSearch = ({ setSearch, search, updateHistory, ...props }) => {
  const classes = useStyles()
  const [term, setTerm] = useState('')
  useEffect(() => (search ? setTerm(search) : setTerm('')), [search])

  const onChange = ({ target: { value } }) => {
    setTerm(value)
  }

  const submit = (event) => {
    if (event.which === 13 || event.keyCode === 13 || event.type === 'click') {
      setSearch(term)
      updateHistory(term)
    }
  }

  return (
    <div>
      <InputBase
        type='text'
        inputProps={{ 'aria-label': 'search marketplace' }}
        className={classes.input}
        placeholder='Search'
        fullWidth
        endAdornment={
          <IconButton aria-label="search" onClick={submit} classes={{ root: classes.iconRoot }}>
            <SearchIcon />
          </IconButton>
        }
        onChange={onChange}
        onKeyPress={submit}
        value={term}
        {...props}
      />
    </div>
  )
}

MarketplaceSearch.propTypes = {
  setSearch: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  updateHistory: PropTypes.func.isRequired,
}

export default MarketplaceSearch
