import { Button } from "@mui/material"



export const ButtonComponent=({text,sx={},...props})=>{

    return(
        <Button sx={sx} variant="contained" color="primary" {...props}>
            {text}
        </Button>
    )
}