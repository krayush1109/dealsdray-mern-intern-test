import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import RegisterPage from '../components/RegisterPage'
import LoginPage from '../components/LoginPage'
import Home from '../components/Home'

const MainRoutes = () => {
    return (
        <>
            <BrowserRouter >
                <Routes>
                    {/* <Route path='/' element={<h1> Home Page</h1>} ></Route> */}
                    <Route path='/' element={<Home />} ></Route>

                    <Route path='/register' element={<RegisterPage />} ></Route>
                    <Route path='/login' element={<LoginPage />} ></Route>


                    {/* <Route path='/res-menu/:id' element={<RestaurantMenu />} ></Route> */}


                    <Route path='*' element={<h1 className='not-found'>Page Not Found! </h1>} ></Route>
                    {/* <Route path='*' element={<NotFound />} ></Route> */}
                </Routes>
            </BrowserRouter>

        </>
    )
}

export default MainRoutes