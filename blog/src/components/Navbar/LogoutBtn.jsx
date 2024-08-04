import { useDispatch } from "react-redux"
import authService from "../../services/AuthService"
import { logout } from "../../store/authSlice"
import { ButtonComponent } from "../Button/ButtonComponent"



export const LogoutBtn=()=>{

    const dispatch = useDispatch()

    const handleLogout=()=>{
         authService.Logout().then(()=>{
            dispatch(logout())
         })
    }
    return(
        <ButtonComponent text="Logout" variant="outlined" color="secondary" onClick={handleLogout}/>
    )
}