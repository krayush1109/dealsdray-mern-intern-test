import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import RegisterPage from '../components/RegisterPage'
import LoginPage from '../components/LoginPage'
import Home from '../page/Home'
import Dashboard from '../page/Dashboard'
import Navbar from '../components/Navbar'
import CreateEmployee from '../page/CreateEmployee'
import EditEmployee from '../page/EditEmployee'
import ProtectedRoute from './ProtectedRoutes'

const MainRoutes = () => {
    return (
        <>

            <BrowserRouter >
                <Navbar />
                
                <Routes>
                    {/* <Route path='/' element={<h1> Home Page</h1>} ></Route> */}
                    <Route path='/' element={<Home />} ></Route>

                    <Route path='/register' element={<RegisterPage />} ></Route>
                    <Route path='/login' element={<LoginPage />} ></Route>

                    
                    <Route path='/create' element={<ProtectedRoute><CreateEmployee /></ProtectedRoute>} ></Route>
                    <Route path='/edit/:e_id' element={<ProtectedRoute><EditEmployee /></ProtectedRoute> } ></Route>
                    <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute> } ></Route>

                    <Route path='*' element={<h1 className='not-found'>Page Not Found! </h1>} ></Route>
                </Routes>
            </BrowserRouter>

        </>
    )
}

export default MainRoutes