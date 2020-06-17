import { useEffect, useReducer } from 'react'

import algoliasearch from 'algoliasearch'
import { useDebouncedCallback } from 'use-debounce'


const reducer = (state, { type, payload }) => {
  const newState = { [type]: payload }

  return { ...state, ...newState }
}

/**
 * Algolia custom hook. Should be called after server API call that retrieves the search key
 * @param {indexName} string algolia index name to be used on the search
 * @param {searchAPIkey} string the search key provided from the server,
 * to this client specificaly, to allow searching under the given index
 * @param {specs} object the custom algolia specs. Default is {} limit 20 results/search
 * @param {algoliaIDkey} string algolia user identification key
 * @return the algolia index if user wants a method other than search
 * the search function per keystroke
 * the debounced search function
 * the results of the search
 */

const useAlgolia = ({ indexName = 'mix_index', searchAPIkey, specs, algoliaIDkey }) => {
  const [state, dispatch] = useReducer(reducer, {
    algoliaIndex: null,
    results: [],
  })

  useEffect(() => {
    const client = algoliasearch(
      algoliaIDkey || process.env.REACT_APP_ALGOLIA_APP_ID,
      searchAPIkey,
    )
    const index = client.initIndex(indexName)
    dispatch({ type: 'algoliaIndex', payload: index })
  }, [indexName, searchAPIkey, algoliaIDkey])

  const search = async (searchTerm) => {
    try {
      const { hits } = await state.algoliaIndex.search(searchTerm, { ...specs })
      dispatch({ type: 'results', payload: hits })
    } catch (error) {
      console.error(error)
    }
  }

  const [debouncedSearch] = useDebouncedCallback((searchTerm) => search(searchTerm), 500)

  return { ...state, search, debouncedSearch }
}

export default useAlgolia
