import { Container } from "@mui/material"


export const Wrapper=({children})=>{
    return(
        <Container maxWidth="xl" sx={{margin:'auto'}}>
            {children}
        </Container>
    )
}