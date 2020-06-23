import React from "react"

import { storiesOf } from "@storybook/react"
import StoryRouter from 'storybook-react-router'

import useAlgolia from '../src/algolia-hook'
import OmniSearch from "../src/mui-search-bar"

storiesOf("OmniSearch", module)
  .addDecorator(StoryRouter())
  .add("Default", () => {
    const specs = {
      hitsPerPage: 50,
      getRankingInfo: true,
      restrictSearchableAttributes: ['name', 'id'],
      exactOnSingleWordQuery: 'word',
    }

    const { debouncedSearch, results } = useAlgolia({
      searchAPIkey: process.env.REACT_APP_ALGOLIA_SEARCH_KEY,
      specs
    })

    return (

      <div
        style={{
          height: 300,
          backgroundColor: 'black',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'

        }}
      >
        <OmniSearch {... { debouncedSearch, results }} />
      </div>
    )
  }
  )