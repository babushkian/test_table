import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import {createBrowserRouter, RouterProvider} from 'react-router'

import {Login} from './components/Login/Login'
import {LoginPlasma} from './components/LoginPlasma/LoginPlasma'

import {Navbar} from './components/Navbar/Navbar'

const router = createBrowserRouter([
    { path: "/", element: <Navbar />, children: [
      { path: "/", element: <App /> },
      { path: "/login", element: <Login /> },
      { path: "/plasma", element: <LoginPlasma /> },
 ] },
]);

    

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        {/* <App /> */}
        <RouterProvider router={router}></RouterProvider>
    </React.StrictMode>
)


