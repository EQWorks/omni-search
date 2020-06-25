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
  OmniSearch
} from '@eqworks/omni-search'
```

## Documentation

### useAlgolia( )
<code>useAlgolia([indexName], searchAPIkey, specs, algoliaIDkey)</code> ⇒ <code><a href="#Hook">Hook</a></code></dt>

Algolia custom hook. Should be called after server API call that retrieves the search key


**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [indexName] | <code>string</code> | <code>&quot;&#x27;mix_index&#x27;&quot;</code> | algolia index name to be used on the search |
| searchAPIkey | <code>string</code> |  | the search key provided from the server, to this client specificaly, to allow searching under the given index |
| specs | <code>object</code> | <code>{}</code>  | the custom algolia specs. Default is 20 results/search |
| algoliaIDkey | <code>string</code> | | algolia user identification key |

<br/>

### Returns: <code>Hook {Object}</code>

| Name | Type | Description |
| --- | --- | --- |
| algoliaIndex | <code>object</code> | the algolia index if user wants a method other than search |
| search | <code>function</code> | the search function per keystroke |
| debouncedSearch | <code>function</code> | the debounced search function |
| results | <code>array</code> | the results of the search |

-----
<a name="OmniSearch"></a>

### OmniSearch
```
< OmniSearch {...{ 
    debouncedSearch,
    results,
    getSelection,
    autocompleteProps,
    inputProps
  }}
/>
  ``` 
 

OmniSearch Component - overlord SUI parity written with MUI

**Kind**: global function  

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| debouncedSearch | <code>function</code> | the debounced algolia search function |
| results | <code>array</code> | the results of the search |
| getSelection | <code>function</code> | ```setState``` => a function that retrieves the details of the selected item (object to be stored in a state) |
| autocompleteProps | <code>object</code> | override props from ```<Autocomplete> ```|
| inputProps | <code>object</code> | override props from ```<InputBase> ```|