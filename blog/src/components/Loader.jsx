

import { CircularProgress } from '@mui/material'
import React from 'react'

export const Loader = ({...props}) => {
  return (
    <CircularProgress  color='primary' {...props}/>
  )
}
