import { Container } from "@mui/material"


export const Wrapper=({children})=>{
    return(
        <Container maxWidth="lg" sx={{margin:'auto'}}>
            {children}
        </Container>
    )
}