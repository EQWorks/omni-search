import { useState, useEffect } from 'react'

import Fuse from 'fuse.js'

const useFuse = (data) => {

  const [fuse, setFuse] = useState({})

  useEffect(() => {
    const options = {
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
    setFuse(new Fuse(data, options))
  }, [data])

  return fuse
}
export default useFuse
