

import React from 'react'
import { Box } from '@mui/material'
import { theme } from './Theme/Theme'
export const Footer = () => {
  return (
   <Box sx={{backgroundColor:theme.palette.primary.main,mt:30}}>
    <footer style={{textAlign:'center',padding:20,color:'white',fontSize:'20px',fontWeight:'bold'}}>
        copyright &copy; 2024.
    </footer>
   </Box>
  )
}
