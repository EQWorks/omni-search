import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
// import { useHistory } from 'react-router-dom'

import Autocomplete from '@material-ui/lab/Autocomplete'
import SearchIcon from '@material-ui/icons/Search'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'

import { searchIndexLevelMap, searchIndexLevelToRouteMap } from './constants/campaing-level'

import { kevin, bell } from './constants/search-examples'


const useStyles = makeStyles((theme) => ({
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

export default function OmniSearch({ debouncedSearch, results, getSelection }) {
  const [input, setInput] = useState('')
  const [value, setValue] = useState(null)
  const [isOpen, setisOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState([])
  // const history = useHistory()

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
    setValue(selection)
    getSelection(selection)
    setisOpen(false)
    setResult([])
    setR([])
    // const newRoute = `/${searchIndexLevelToRouteMap[selection.level]}/${selection.id}`
    // history.push(newRoute)
  }

  const handleOnBlur = () => {
    setisOpen(false)
    setLoading(false)
    setResult([])
    setR([])
  }

  return (
    <Autocomplete
      debug
      className={classes.container}
      id='overlord-grouped-search'
      loading={loading}
      disableClearable
      freeSolo
      autoComplete
      filterSelectedOptions
      includeInputInList
      blurOnSelect
      noOptionsText='No results found'
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
        // console.log(params)
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
            />
          </div>
        )
      }}
    />
  )
}

OmniSearch.propTypes = {
  debouncedSearch: PropTypes.func.isRequired,
  getSelection: PropTypes.func,
  results: PropTypes.array.isRequired
}

