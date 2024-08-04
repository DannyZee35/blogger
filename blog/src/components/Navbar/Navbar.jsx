import { AppBar, Box, Typography, Toolbar } from "@mui/material";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LogoutBtn } from "./LogoutBtn";
import { ButtonComponent } from "../Button/ButtonComponent";

export const Navbar = () => {
  const navigate=useNavigate()
  const authStatus = useSelector((state) => state.auth.status);
 
  const navItems = [
    {
      name: "Home",
      path: "/",
      active: true,
    },
    {
      name: "Login",
      path: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      path: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      path: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      path: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <AppBar component="nav" position="sticky"  sx={{padding:0,margin:0}}>
      
      <Toolbar >
        <Typography>LOGO</Typography>

        <Box sx={{display:"flex", listStyle:"none"}}>
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <ButtonComponent onClick={()=>navigate(item.path)} text={item.name} />
              </li>
            ) : (
              null
            )
          )}
          {authStatus && (
            <li>
              <LogoutBtn />
            </li>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
