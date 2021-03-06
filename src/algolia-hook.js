import { useEffect, useReducer } from 'react'

import algoliasearch from 'algoliasearch'
import { useDebouncedCallback } from 'use-debounce'


const reducer = (state, { type, payload }) => {
  const newState = { [type]: payload }

  return { ...state, ...newState }
}

/**
 * @typedef {Object} Hook
 * @property {object} algoliaIndex - the algolia index if user wants a method other than search
 * @property {function} search - the search function per keystroke
 * @property {function} debouncedSearch - the debounced search function
 * @property {array} results - the results of the search
 */

/**
 * Algolia custom hook. Should be called after server API call that retrieves the search key
 * @function useAlgolia
 * @param {string} [indexName='mix_index'] algolia index name to be used on the search
 * @param {string} searchAPIkey the search key provided from the server,
 * to this client specificaly, to allow searching under the given index
 * @param {object} specs the custom algolia specs. Default is {} limit 20 results/search
 * @param {string} algoliaIDkey algolia user identification key
 * @returns {Hook} 
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
