
import { TextField } from "@mui/material"
import React from "react"
const Input=({label,sx={},...props},ref)=>{

    return(
        <TextField  label={label} variant="outlined" {...props} sx={sx} ref={ref}/>
    )
}

export default React.forwardRef(Input)