import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authService from "./services/AuthService";
import { login, logout } from "./store/authSlice";
import { LogoutBtn } from "./components/Navbar/LogoutBtn";
import { Navbar } from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Footer } from "./components/Footer";


function App() {
  const [loading, setLodaing] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLodaing(false);
      });
  });
  return <>{loading ? "" : <div>
   <Navbar/>
   <main>
        <Outlet />
        </main>
        <Footer/>
    </div>}</>;
}

export default App;
