import { useEffect, useReducer } from 'react'

import Fuse from 'fuse.js'

const useFuse = (value) => {

const [loading, setLoading] = useState(false);
const [fuse, setFuse] = useState(null);

  useEffect(() => {
    loadData = async () => {
      setLoading(true)

      const options = {
        shouldSort: true,
        tokenize: true,
        matchAllTokens: true,
        threshold: 0,
        keys: [
          'meta.name',
          'category',
          'vendor_name',
          'vendor_description',
          'meta.description',
        ],
      }

      try {
        const { data } = await getAxios().get('/market/list')
        const { items = []} = data
        items.forEach((item) => { item.meta.nameArray = item.meta.name.split('::') })
        setFuse(new Fuse(items, options))
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    loadData()

  
    
  }, []);
  
  const results = fuse ? fuse.search(value) : []

  return {results}
}
export default useFuse
