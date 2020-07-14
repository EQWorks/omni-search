import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Autocomplete from '@material-ui/lab/Autocomplete'
import SearchIcon from '@material-ui/icons/Search'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'

import { searchIndexLevelMap } from './constants/campaing-level'


const useStyles = makeStyles((theme) => ({
  container: { margin: theme.spacing(1) },
  paper: {
    minWidth: '80px',
    padding: theme.spacing(0.5),
    textAlign: 'center'
  },
  content: { paddingLeft: 20 },
  input: {
    backgroundColor: 'white',
    borderRadius: '0.285714rem',
    padding: theme.spacing(0.75, 2),
    width: '30rem'
  }
}))


/**
 * OmniSearch Component - overlord SUI parity written with MUI 
 * @function OmniSearch
 * @property {function} debouncedSearch - the debounced search function
 * @property {array} results - the results of the search
 * @property {function} getSelection - a function that retrieves the details of the selected item (object to be stored in a state)
 * @property {object} autocompleteProps - override props from <Autocomplete>
 * @property {object} inputProps - override props from <InputBase>
 */

export default function OmniSearch({
  debouncedSearch,
  results,
  getSelection,
  autocompleteProps,
  inputProps
}) {
  const [input, setInput] = useState('')
  const [value, setValue] = useState(null)
  const [isOpen, setisOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState([])

  const classes = useStyles()

  useEffect(() => {
    if (results.length) {
      let catogorizedResults = []
      Object.keys(searchIndexLevelMap).forEach((category) => {
        let typeResults = results.filter(
          (result) => result.level === searchIndexLevelMap[category]
        )
        typeResults = typeResults.map((c) => ({
          category: category,
          name: c.name,
          id: c.id,
          level: c.level,
        }))
        if (typeResults.length !== 0) {
          catogorizedResults = [...catogorizedResults, ...typeResults]
        }
      })
      setResult(catogorizedResults)
    }
    setLoading(false)

  }, [results])

  const handleSearchChange = (e, newValue, reason) => {

    if (reason === 'input') {
      setLoading(true)
      setInput(newValue)
      setisOpen(true)
      debouncedSearch(newValue)
    } else {
      setInput('')
    }
  }

  const select = (e, selection) => {
    getSelection && getSelection(selection)
    setValue(selection) //not doing much with this logic
    setLoading(false)
    setisOpen(false)
    setResult([])
  }

  const handleOnBlur = () => {
    setisOpen(false)
    setLoading(false)
    setResult([])
  }

  return (
    <Autocomplete
      className={classes.container}
      id='overlord-grouped-search'
      loading={loading}
      freeSolo
      includeInputInList
      blurOnSelect
      open={isOpen}
      filterOptions={(x) => x}
      options={result}
      groupBy={(option) => option.category}
      inputValue={input}
      onInputChange={handleSearchChange}
      value={value}
      onChange={select}
      getOptionLabel={(option) => `${option.id} - ${option.name}`}
      renderOption={(option) => (
        <>
          <Paper variant='outlined' className={classes.paper}>{option.id}</Paper>
          <div className={classes.content}>{option.name}</div>
        </>
      )
      }
      ListboxProps={{ style: { maxHeight: '90vh', height: '100%' } }}
      onBlur={handleOnBlur}
      renderInput={(params) => {
        return (
          <div ref={params.InputProps.ref}>
            < InputBase
              type="text"
              {...params.inputProps}
              className={classes.input}
              placeholder='Search...'
              fullWidth
              endAdornment={
                loading ? <CircularProgress color="secondary" size={20} /> : <SearchIcon />}
              {...inputProps}
            />
          </div>
        )
      }}
      {...autocompleteProps}
    />
  )
}

OmniSearch.propTypes = {
  debouncedSearch: PropTypes.func.isRequired,
  results: PropTypes.array.isRequired,
  getSelection: PropTypes.func,
  autocompleteProps: PropTypes.object,
  inputProps: PropTypes.object,
}

OmniSearch.defaultProps = {
  getSelection: (value) => value,
  autocompleteProps: {},
  inputProps: {},
}
