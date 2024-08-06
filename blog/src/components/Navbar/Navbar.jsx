import { AppBar, Box, Typography, Toolbar, CssBaseline } from "@mui/material";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LogoutBtn } from "./LogoutBtn";
import { ButtonComponent } from "../Button/ButtonComponent";

export const Navbar = () => {
  const navigate = useNavigate();
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
    <AppBar component="nav" position="sticky" sx={{ padding: 0, margin: 0 }}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
           justifyContent: "center", //{ xs: 'center', lg: 'start' } ,

         
          p: 2,
          ml: { sm: 0, lg: 20 },
          gap: 3,
        }}
      >
        {/* <Typography sx={{ mr: { sm: 0, lg: 70 }, color: "white" }}>
          LOGO
        </Typography> */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
            listStyle: "none",
          }}
        >
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <Typography>
                  <Link
                    to={item.path}
                    style={{
                      textDecoration: "none",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {item.name}
                  </Link>
                </Typography>
              </li>
            ) : null
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
