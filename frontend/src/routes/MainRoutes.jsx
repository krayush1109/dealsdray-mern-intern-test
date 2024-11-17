import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import RegisterPage from '../components/RegisterPage'
import LoginPage from '../components/LoginPage'
import Home from '../page/Home'
import Dashboard from '../page/Dashboard'
import Navbar from '../components/Navbar'
import CreateEmployee from '../page/CreateEmployee'
import EditEmployee from '../page/EditEmployee'

const MainRoutes = () => {
    return (
        <>

            <BrowserRouter >
                <Navbar />
                <Routes>
                    {/* <Route path='/' element={<h1> Home Page</h1>} ></Route> */}
                    <Route path='/' element={<Home />} ></Route>
                    <Route path='/dashboard' element={<Dashboard />} ></Route>

                    <Route path='/register' element={<RegisterPage />} ></Route>
                    <Route path='/login' element={<LoginPage />} ></Route>

                    <Route path='/create' element={<CreateEmployee />} ></Route>
                    <Route path='/edit/:e_id' element={<EditEmployee />} ></Route>

                    {/* <Route path='/res-menu/:id' element={<RestaurantMenu />} ></Route> */}


                    <Route path='*' element={<h1 className='not-found'>Page Not Found! </h1>} ></Route>
                    {/* <Route path='*' element={<NotFound />} ></Route> */}
                </Routes>
            </BrowserRouter>

        </>
    )
}

export default MainRoutes