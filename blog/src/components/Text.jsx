


import { Typography } from '@mui/material'
import React from 'react'

export const Text = ({text,sx,...props}) => {
  return (
    <Typography color={'secondary'} sx={sx} {...props}>
        {text}
    </Typography>
  )
}
