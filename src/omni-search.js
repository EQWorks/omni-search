import React, { useEffect, useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'

import { Search } from 'semantic-ui-react'
import axios from 'axios'

// import { searchIndexLevelMap, searchIndexLevelToRouteMap } from '../utils/level-to-name'
// import authHeader from '../utils/auth-header'
import Styles from './search.css'
import useAlgolia from './algolia-hook'


const searchIndexLevelToRouteMap = {
  wl: 'whitelabel',
  cu: 'customer',
  offer: 'campaign',
  flight: 'campaign',
  mb: 'campaign',
}

const searchIndexLevelMap = {
  'White Labels': 'wl',
  Customers: 'cu',
  Campaigns: 'offer',
  Flights: 'flight',
  'Media Buys': 'mb',
}

// const authHeader = () => {
//   // return authorization header with jwt token
//   const user = window.localStorage.getItem('auth_user')
//   const jwt = window.localStorage.getItem('auth_jwt')
//   if (user && jwt) {
//     return { 'eq-api-user': user, 'eq-api-jwt': jwt }
//   }
//   return {}
// }

const user = process.env.REACT_APP_USER
const jwt = process.env.REACT_APP_JWT

const OmniSearch = () => {
  const [customResults, setCustomResults] = useState({})
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState('')
  const [message, setMessage] = useState('Loading...')
  const history = useHistory()
  const searchKey = useRef()

  useEffect(() => {
    const loadAlgoliaSearch = async () => {
      try {
        setLoading(true)
        const response = await axios({
          // url: '/search/apikey',
          url: 'http://localhost:5000/search/apikey',
          method: 'get',
          headers: { 'eq-api-user': user, 'eq-api-jwt': jwt },
        })
        searchKey.current = response.data
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    loadAlgoliaSearch()
  }, [])

  const specs = {
    hitsPerPage: 50,
    getRankingInfo: true,
    restrictSearchableAttributes: ['name', 'id'],
    exactOnSingleWordQuery: 'word',
  }
  const { debouncedSearch, results } = useAlgolia({
    searchAPIkey: searchKey.current,
    specs,
  })

  useEffect(() => {
    if (results.length) {
      const catogorizedResults = {}
      Object.keys(searchIndexLevelMap).forEach((name) => {
        let typeResults = results.filter(
          (result) => result.level === searchIndexLevelMap[name],
        )
        typeResults = typeResults.map((x) => ({
          title: x.name,
          key: x.id,
          price: x.id.toString(),
          data: x.level,
        }))
        if (typeResults.length !== 0) {
          catogorizedResults[name] = {
            name, // media buy, flight, campaign, customer and wl
            results: typeResults,
          }
        }
      })
      setCustomResults(catogorizedResults)
    }
  }, [results])

  const select = (result) => {
    const newRoute = `/${searchIndexLevelToRouteMap[result.data]}/${result.key}`
    history.push(newRoute)
  }

  const handleSearchChange = (_, { value }) => {
    setValue(value)
    debouncedSearch(value) // loads results
  }

  const handleResultSelect = (_, { result }) => {
    setValue('')
    select(result)
  }
  // eslint-disable-next-line react/prop-types
  const resultRenderer = ({ title, price }) => {
    setMessage('No results found.')
    return (
      <div>
        <span className={Styles.resultID}>{price}</span>
        <span className={Styles.resultName}>{title}</span>
      </div>
    )
  }

  return (
    <Search
      placeholder='Search...'
      className={Styles.search}
      category
      fluid
      size='mini'
      loading={loading}
      onResultSelect={handleResultSelect}
      onSearchChange={handleSearchChange}
      resultRenderer={resultRenderer}
      results={customResults}
      value={value}
      noResultsMessage={message}
    />
  )
}

export default OmniSearch
