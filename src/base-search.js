import React from 'react'
import PropTypes from 'prop-types'

import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => {
  // const theme = {
  //   ...t,
  //   typography: {
  //     ...t.typography,
  //     ...typography,
  //   },
  //   palette: {
  //     ...t.palette,
  //     ...palette,
  //   },
  // }

  return {
    input: {
      backgroundColor: 'white',
      borderRadius: '25px',
      padding: theme.spacing(0.75, 2),
      width: '270px',
      height: '40px',
      border: '1px solid grey'
    }
  }
})

const BaseSearch = ({ onChange, ...props }) => {
  const classes = useStyles()
  
  return (
    <div>
      < InputBase
        type="text"
        inputProps={{ 'aria-label': 'search marketplace' }}
        className={classes.input}
        placeholder='Search'
        fullWidth
        endAdornment={<SearchIcon />}
        onChange={onChange}
        {...props}
      />

    </div>
  )
}

BaseSearch.propTypes = { onChange: PropTypes.func.isRequired }

export default BaseSearch