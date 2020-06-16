import React from "react"

import { storiesOf } from "@storybook/react"

import { OmniSearch } from "../src"

storiesOf("OmniSearch", module)
  .add("Default", () => <div><OmniSearch /></div>)