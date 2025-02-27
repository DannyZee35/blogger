import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AuthLayout } from './components/index.js'
import {AddPost} from "./pages/AddPost";
import {Signup} from './pages/Signup'
import {EditPost} from "./pages/EditPost";
import {Home} from "./pages/Home";
import {Login} from "./pages/Login";

import {Post} from "./pages/Post";
import { AllPost } from './pages/AllPost.jsx'
import { ThemeProvider } from '@mui/material'
import { theme } from './components/Theme/Theme.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <AuthLayout authentication>
                 <AllPost/>
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthLayout authentication>
                   
                    <AddPost />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <EditPost />
                </AuthLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
    ],
},
])
ReactDOM.createRoot(document.getElementById('root')).render(

  
  <React.StrictMode>
    <Provider store={store}>
        <ThemeProvider theme={theme}>

  
    <RouterProvider router={router}/>
    </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)
