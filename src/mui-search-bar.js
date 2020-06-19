import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import SearchIcon from '@material-ui/icons/Search'
import Paper from '@material-ui/core/Paper'
import CircularProgress from '@material-ui/core/CircularProgress'
import Divider from '@material-ui/core/Divider'

import useAlgolia from './algolia-hook'
import { searchIndexLevelMap, searchIndexLevelToRouteMap } from './constants/campaing-level'

const res = [
  {
    "category": "Campaigns",
    "name": "Bell Walkthrough Test",
    "id": 68916,
    "level": "offer"
  },
  {
    "category": "Campaigns",
    "name": "Bell's Corner",
    "id": 63443,
    "level": "offer"
  },
  {
    "category": "Campaigns",
    "name": "Bell - Wholesale",
    "id": 57581,
    "level": "offer"
  },
  {
    "category": "Campaigns",
    "name": "Bell Virgin Internet Campaign TEST",
    "id": 48375,
    "level": "offer"
  },
  {
    "category": "Flights",
    "name": "Bellflower License ",
    "id": 76946,
    "level": "flight"
  },
  {
    "category": "Flights",
    "name": "Bell V2 SMB: July 2017",
    "id": 40902,
    "level": "flight"
  },
  {
    "category": "Media Buys",
    "name": "Bel Aire Mayfair (Click)",
    "id": 64693,
    "level": "mb"
  },
  {
    "category": "Media Buys",
    "name": "Bel Aire Mayfair",
    "id": 64691,
    "level": "mb"
  },
  {
    "category": "Media Buys",
    "name": "Beltline Neighbourhood (Click)",
    "id": 66555,
    "level": "mb"
  },
  {
    "category": "Media Buys",
    "name": "Beltline Neighbourhood (View)",
    "id": 66553,
    "level": "mb"
  },
  {
    "category": "Media Buys",
    "name": "Beltline Neighbourhood",
    "id": 66540,
    "level": "mb"
  },
  {
    "category": "Media Buys",
    "name": "Belmont (View)",
    "id": 65886,
    "level": "mb"
  },
  {
    "category": "Media Buys",
    "name": "Belmont",
    "id": 65884,
    "level": "mb"
  },
  {
    "category": "Media Buys",
    "name": "Bell's Corner (Click)",
    "id": 65392,
    "level": "mb"
  },
  {
    "category": "Media Buys",
    "name": "BELL0458_T02-E_GREENFIELD_Mobile_ON_EN_Added Value",
    "id": 64396,
    "level": "mb"
  },
  {
    "category": "Media Buys",
    "name": "BELL0474 _FR_Rest of Canada_T02_RT",
    "id": 64005,
    "level": "mb"
  },
  {
    "category": "Media Buys",
    "name": "BELL0474 _FR_Quebec_T02_RT",
    "id": 64003,
    "level": "mb"
  },
  {
    "category": "Media Buys",
    "name": "BELL0474 _EN_Rest of Canada_T01_RT",
    "id": 64001,
    "level": "mb"
  },
  {
    "category": "Media Buys",
    "name": "BELL0474 _EN_North_T01_RT",
    "id": 63999,
    "level": "mb"
  },
  {
    "category": "Media Buys",
    "name": "BELL0474 _EN_Quebec_T01_RT",
    "id": 63997,
    "level": "mb"
  },
  {
    "category": "Media Buys",
    "name": "BELL0474 _FR_Quebec_T02_WL",
    "id": 63932,
    "level": "mb"
  },
  {
    "category": "Media Buys",
    "name": "BELL0474 _FR_Rest of Canada_T02_WL",
    "id": 63930,
    "level": "mb"
  },
  {
    "category": "Media Buys",
    "name": "BELL0474 _EN_North_T01_WL",
    "id": 63928,
    "level": "mb"
  },
  {
    "category": "Media Buys",
    "name": "BELL0474 _EN_Quebec_T01_WL",
    "id": 63926,
    "level": "mb"
  },
  {
    "category": "Media Buys",
    "name": "BELL0474 _EN_Rest of Canada_T01_WL",
    "id": 63924,
    "level": "mb"
  },
  {
    "category": "Media Buys",
    "name": "BELL0474 _FR_Rest of Canada_T02_Hylomo",
    "id": 63879,
    "level": "mb"
  },
  {
    "category": "Media Buys",
    "name": "BELL0474 _FR_Quebec_T02_Hylomo",
    "id": 63877,
    "level": "mb"
  },
  {
    "category": "Media Buys",
    "name": "BELL0474 _EN_Rest of Canada_T01_Hylomo",
    "id": 63872,
    "level": "mb"
  },
  {
    "category": "Media Buys",
    "name": "BELL0474 _EN_Quebec_T01_Hylomo",
    "id": 63870,
    "level": "mb"
  },
  {
    "category": "Media Buys",
    "name": "BELL0474 _EN_North_T01_Hylomo",
    "id": 63868,
    "level": "mb"
  },
  {
    "category": "Media Buys",
    "name": "Beltline Work Nicer (View)",
    "id": 63685,
    "level": "mb"
  },
  {
    "category": "Media Buys",
    "name": "Beltline Work Nicer",
    "id": 63683,
    "level": "mb"
  },
  {
    "category": "Media Buys",
    "name": "Bell's Corner",
    "id": 63446,
    "level": "mb"
  },
  {
    "category": "Media Buys",
    "name": "BELL0458_T01-E_GREENFIELD_RT_Mobile_ON_EN",
    "id": 63047,
    "level": "mb"
  },
  {
    "category": "Media Buys",
    "name": "BELL0458_T01-E_GREENFIELD_Mobile_ON_EN",
    "id": 62970,
    "level": "mb"
  },
  {
    "category": "Media Buys",
    "name": "BELL0445_T01_Standard_CT_ON_EN_GTA",
    "id": 60826,
    "level": "mb"
  },
  {
    "category": "Media Buys",
    "name": "BELL0445_T02_Interstitia_RT - CLICKS_ON_EN_GTA",
    "id": 60602,
    "level": "mb"
  },
  {
    "category": "Media Buys",
    "name": "BELL0445_T01_Standard_RT - CLICKS_ON_EN_GTA",
    "id": 60600,
    "level": "mb"
  },
  {
    "category": "Media Buys",
    "name": "BELL0445_T01_Standard_RT_ON_EN_GTA",
    "id": 60598,
    "level": "mb"
  },
  {
    "category": "Media Buys",
    "name": "BELL0445_T02_Interstitia_RT_ON_EN_GTA",
    "id": 60576,
    "level": "mb"
  },
  {
    "category": "Media Buys",
    "name": "BELL0445_T02_Interstitial_ON_EN_GTA ",
    "id": 59724,
    "level": "mb"
  },
  {
    "category": "Media Buys",
    "name": "BELL0445_T01_Standard_ON_EN_GTA",
    "id": 59721,
    "level": "mb"
  },
  {
    "category": "Media Buys",
    "name": "Bell V2 SMB: July 2017 Fr Response",
    "id": 48384,
    "level": "mb"
  },
  {
    "category": "Media Buys",
    "name": "Bell V2 SMB: July 2017 Eng Response",
    "id": 48382,
    "level": "mb"
  },
  {
    "category": "Media Buys",
    "name": "Bell V2 SMB: July 2017 FRENCH",
    "id": 48380,
    "level": "mb"
  },
  {
    "category": "Media Buys",
    "name": "Bell V2 SMB: July 2017 ENGLISH",
    "id": 48378,
    "level": "mb"
  },
  {
    "category": "Media Buys",
    "name": "Bell V2 SMB: July 2017 Fr Response",
    "id": 40910,
    "level": "mb"
  },
  {
    "category": "Media Buys",
    "name": "Bell V2 SMB: July 2017 Eng Response",
    "id": 40908,
    "level": "mb"
  },
  {
    "category": "Media Buys",
    "name": "Bell V2 SMB: July 2017 FRENCH",
    "id": 40906,
    "level": "mb"
  },
  {
    "category": "Media Buys",
    "name": "Bell V2 SMB: July 2017 ENGLISH",
    "id": 40904,
    "level": "mb"
  }
]

export default function OmniSearch() {
  const [input, setInput] = useState('')
  const [value, setValue] = useState(null)
  const [isOpen, setisOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState([])
  const [message, setMessage] = useState('Loading ...')
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
    if (results.length) {
      // if (r.length) {
      let catogorizedResults = []
      Object.keys(searchIndexLevelMap).forEach((category) => {
        // let typeResults = r.filter(
        let typeResults = results.filter(
          (result) => result.level === searchIndexLevelMap[category]
          // (result) => result.level === searchIndexLevelMap[category]
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
    
    // }, [r])
  }, [results])

  const select = (e, selection) => {
    setisOpen(false)
    setResult([])
    setR([])
    const newRoute = `/${searchIndexLevelToRouteMap[selection.level]}/${selection.id}`
    history.push(newRoute)
  }

  const handleSearchChange = (e, newValue) => {
    setLoading(true)
    setInput(newValue)
    setisOpen(true)
    // setR(res)
    debouncedSearch(input)
  }

  return (
    <Autocomplete
      style={{
        '*:focus': { outline: 'none' }, // not doing anything
        width: '30rem',
      }}
      id='overlord-grouped-search'
      loading={loading}
      loadingText={message}
      disableClearable
      freeSolo
      blurOnSelect
      noOptionsText='No results found'
      open={isOpen}
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
            <div style={{ width: 80 }}>{option.id}</div>
            <Divider orientation='vertical' flexItem />
            <div style={{ paddingRight: 20 }}>{option.name}</div>
          </>
        )
      }}
      getOptionLabel={(option) => `${option.id} - ${option.name}`}
      popupIcon={
        loading
          ? <CircularProgress color="inherit" size={20} />
          : <SearchIcon />
      }
      forcePopupIcon
      onBlur={() => {
        setisOpen(false)
        // setR([])
      }}
      renderInput={(params) => {
        // console.log(params)
        return (
          <TextField

            {...params}
            placeholder='Search...'
            variant='outlined'
            InputLabelProps={{ shrink: false }}
            size='small'
            style={{
              '*:focus': { outline: 'none' }, // not doing anything
              backgroundColor: 'white',
              borderRadius: '0.285714rem'
            }}
          />
        )
      }}
    />
  )
}

