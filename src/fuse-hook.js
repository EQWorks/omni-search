import { useEffect, useReducer } from 'react'

import Fuse from 'fuse.js'

const useFuse = (data) => {

  // const [loading, setLoading] = useState(false);
  // const [fuse, setFuse] = useState(null);

  // useEffect(() => {
  // loadData = async () => {
  // setLoading(true)

  const options = {
    shouldSort: true,
    threshold: 0,
    keys: [
      'meta.name',
      'category',
      'vendor_name',
      'vendor_description',
      'meta.description',
    ],
  }

  // try {
  // const { data } = await getAxios().get('/market/list')
  // const { items = []} = data
  // items.forEach((item) => { item.meta.nameArray = item.meta.name.split('::') })
  const fuse = new Fuse(data, options)
  // setFuse(new Fuse(data, options))
  // } catch (error) {
  //   console.error(error)
  // } finally {
  //   setLoading(false)
  // }
  // }

  // loadData()

  console.log(fuse.search('Do'))
  console.log(fuse.search)

  // }, [fuse]);

  const search = fuse.search

  return {search, options}
}
export default useFuse
