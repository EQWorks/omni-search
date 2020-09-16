import { useMemo } from 'react'

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
  return useMemo(() => {
    const specs = {
      shouldSort: true,
      tokenize: true,
      matchAllTokens: true,
      threshold: 0.3,
      ignoreLocation: true,
      keys: [
        'meta.name',
        'meta.description',
        'category',
        'vendor_name',
        'vendor_description',
      ],
    }

    const config = options ? options : specs
    return new Fuse(data, config)
  }, [data])
}
export default useFuse
