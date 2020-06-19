import React from "react"

import { storiesOf } from "@storybook/react"
import StoryRouter from 'storybook-react-router'

import OmniSearch from "../src/mui-search-bar"

storiesOf("OmniSearch", module)
  .addDecorator(StoryRouter())
  .add("Default", () => (
    <div
      style={{
        height: 300,
        backgroundColor: 'black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'

      }}
    >
      <OmniSearch />
    </div>
  )
  )