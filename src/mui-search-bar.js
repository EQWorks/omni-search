import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Autocomplete from '@material-ui/lab/Autocomplete'
import SearchIcon from '@material-ui/icons/Search'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'

import { searchIndexLevelMap } from './constants/campaing-level'

import { kevin, bell } from './constants/search-examples'


const useStyles = makeStyles(() => ({
  container: { width: '30rem' },
  paper: {
    minWidth: '80px',
    padding: 5,
    textAlign: 'center'
  },
  content: { paddingLeft: 20 },
  input: {
    backgroundColor: 'white',
    borderRadius: '0.285714rem',
    padding: '6px 15px '
  }
}))

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

  const [r, setR] = useState([])

  const classes = useStyles()

  useEffect(() => {
    // if (results.length) {
    if (r.length) {
      let catogorizedResults = []
      Object.keys(searchIndexLevelMap).forEach((category) => {
        let typeResults = r.filter(
          // let typeResults = results.filter(
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
      setLoading(false)
      // console.log(catogorizedResults)
    } else {
      setLoading(false)
    }

  }, [r])
  // }, [results])

  const handleSearchChange = (e, newValue) => {
    setLoading(true)
    setInput(newValue)
    setisOpen(true)
    setR(kevin)
    // debouncedSearch(input)
  }

  const select = (e, selection) => {
    getSelection && getSelection(selection)
    setValue(selection)
    setisOpen(false)
    setResult([])
    setR([])
  }

  const handleOnBlur = () => {
    setisOpen(false)
    setLoading(false)
    setResult([])
    setR([])
  }

  return (
    <Autocomplete
      className={classes.container}
      id='overlord-grouped-search'
      loading={loading}
      freeSolo
      filterSelectedOptions
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
  inputProps: PropTypes.object
}

