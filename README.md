# omni-search ![Master](https://github.com/EQWorks/omni-search/workflows/Master/badge.svg)

EQWorks business specific elements for Omni Search

Requires peer dependencies:

-   `react` - `^16`
-   `react-dom` - `^16`
-   `algoliasearch` - `^4.1.0`
-   `use-debounce` - `^3.4.2`

```js
import {
  useAlgolia,
} from '@eqworks/omni-search'
```

## Documentation


<dl>
<dt><code>useAlgolia([indexName], searchAPIkey, specs, algoliaIDkey)</code> ⇒ <code><a href="#Hook">Hook</a></code></dt>
<dd><p>Algolia custom hook. Should be called after server API call that retrieves the search key</p>
</dd>
</dl>


**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [indexName] | <code>string</code> | <code>&quot;&#x27;mix_index&#x27;&quot;</code> | algolia index name to be used on the search |
| searchAPIkey | <code>string</code> |  | the search key provided from the server, to this client specificaly, to allow searching under the given index |
| specs | <code>object</code> |  | the custom algolia specs. Default is  <code>{}</code> limit 20 results/search |
| algoliaIDkey | <code>string</code> |  | algolia user identification key |


## Returns: <code>Hook {Object}</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| algoliaIndex | <code>object</code> | the algolia index if user wants a method other than search |
| search | <code>function</code> | the search function per keystroke |
| debouncedSearch | <code>function</code> | the debounced search function |
| results | <code>array</code> | the results of the search |