import { useDispatch } from "react-redux"
import authService from "../../services/AuthService"
import { logout } from "../../store/authSlice"
import { ButtonComponent } from "../Button/ButtonComponent"
import { useNavigate } from "react-router-dom"



export const LogoutBtn=()=>{
    const navigate= useNavigate()
    const dispatch = useDispatch()

    const handleLogout=()=>{
         authService.Logout().then(()=>{
            dispatch(logout())
            navigate('/login')
         })
    }
    return(
        <ButtonComponent text="Logout" variant="contained" color="error" sx={{textTransform:"none",color:'white'}}  onClick={handleLogout}/>
    )
}