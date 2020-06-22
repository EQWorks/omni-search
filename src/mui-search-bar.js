import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'
import SearchIcon from '@material-ui/icons/Search'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import CircularProgress from '@material-ui/core/CircularProgress'

import useAlgolia from './algolia-hook'
import { searchIndexLevelMap, searchIndexLevelToRouteMap } from './constants/campaing-level'

import { kevin, bell } from './constants/search-examples'


export default function OmniSearch() {
  const [input, setInput] = useState('')
  const [value, setValue] = useState(null)
  const [isOpen, setisOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState([])
  const history = useHistory()

  const [r, setR] = useState([])

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
      console.log(catogorizedResults)
    } else {
      setLoading(false)
    }

  }, [r])
  // }, [results])

  const select = (e, selection) => {
    setisOpen(false)
    setResult([])
    setR([])
    const newRoute = `/${searchIndexLevelToRouteMap[selection.level]}/${selection.id}`
    history.push(newRoute)
  }

  const handleSearchChange = (e, newValue, reason) => {
    setLoading(true)
    setInput(newValue)
    setisOpen(true)
    setR(bell)
    console.log(reason)
    // debouncedSearch(input)
  }

  return (
    <Autocomplete
      style={{ width: '30rem' }}
      id='overlord-grouped-search'
      loading={loading}
      disableClearable
      freeSolo
      blurOnSelect
      noOptionsText='No results found'
      open={isOpen}
      // filterOptions={(options, state) => {
      //   console.log(options)
      //   return createFilterOptions({
      //     ...options
      //   })
      // }}
      // getOptionSelected={(option, value) => {
      //   console.log('getOptionselected')
      //   return true
      // }}
      options={result}
      groupBy={(option) => option.category}
      inputValue={input}
      onInputChange={handleSearchChange}
      value={value}
      onChange={select}
      renderOption={(option, state) => {
        // console.log(state)
        return (
          <>
            <Paper variant='outlined' style={{ minWidth: '80px', padding: 5, textAlign: 'center' }}>{option.id}</Paper>
            <div style={{ paddingLeft: 20 }}>{option.name}</div>
          </>
        )
      }}
      getOptionLabel={(option) => `${option.id} - ${option.name}`}
      onBlur={() => {
        setisOpen(false)
        setLoading(false)
        setR([])
      }}
      renderInput={(params) => {
        // console.log(params)
        return (
          <div ref={params.InputProps.ref}>
            < InputBase
              type="text"
              {...params.inputProps}
              style={{
                backgroundColor: 'white',
                borderRadius: '0.285714rem',
                padding: '6px 15px '
              }}
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

