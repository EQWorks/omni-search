import { useState, useEffect } from 'react'

import Fuse from 'fuse.js'

/**
 * @typedef {Object} Hook
 * @property {object} fuse - the initiated fuse object to call search  on a term or any other method
 */

/**
 * Fuse custom hook. Should be called after server API call that retrieves data
 * @function useFuse
 * @param {Array} data the array of objects to initiate Fuse with
 * @param {object} options optional: Fuse specs for the search. Default to marketplace config
 * @returns {Hook}
 */

const useFuse = (data, options) => {

  const [fuse, setFuse] = useState(null)

  useEffect(() => {
    const specs = {
      shouldSort: true,
      tokenize: true,
      matchAllTokens: true,
      threshold: 0.3,
      keys: [
        'meta.name',
        'category',
        'vendor_name',
        'vendor_description',
        'meta.description',
      ],
    }

    const config = options ? options : specs
    setFuse(new Fuse(data, config))
  }, [data])

  return fuse
}
export default useFuse
