import React, { useState, useEffect } from "react"

import { storiesOf } from "@storybook/react"
import StoryRouter from 'storybook-react-router'

import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'

import OmniSearch from "../src/mui-search-bar"
import useAlgolia from '../src/algolia-hook'


storiesOf("OmniSearch", module)
  .addDecorator(StoryRouter())
  .add("Default", () => (
    <div
      style={{
        height: 300,
        backgroundColor: 'black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'

      }}
    >
      <OmniSearch />
    </div>
  ))
  .add('NomniSearch', () => {
    const [value, setValue] = useState(null)
    const [inputValue, setInputValue] = useState('')
    const [options, setOptions] = useState([])
    const specs = {
      hitsPerPage: 50,
      getRankingInfo: true,
      restrictSearchableAttributes: ['name', 'id'],
      exactOnSingleWordQuery: 'word',
    }

    const { debouncedSearch, results } = useAlgolia({
      searchAPIkey: process.env.REACT_APP_ALGOLIA_SEARCH_KEY,
      specs,
    })

    useEffect(() => {
      if (inputValue) {
        debouncedSearch(inputValue)
      }
    }, [inputValue])

    useEffect(() => {
      setOptions(results)
    }, [results])

    return (
      <Autocomplete
        id="grouped-demo"
        options={options}
        autoComplete
        filterSelectedOptions
        includeInputInList
        value={value}
        groupBy={(option) => option.level}
        getOptionLabel={(option) => `${option.id} - ${option.name}`}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="With categories" variant="outlined" />}
        filterOptions={(x) => x}
        onChange={(_, newValue) => {
          setValue(newValue)
        }}
        onInputChange={(_, newInputValue) => {
          setInputValue(newInputValue)
        }}
      />
    )
  })
