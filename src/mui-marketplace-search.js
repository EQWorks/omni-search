import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import SearchIcon from '@material-ui/icons/Search'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import CircularProgress from '@material-ui/core/CircularProgress'
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

const FizzySearch = ({ onChange, ...props }) => {
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

export default FizzySearch