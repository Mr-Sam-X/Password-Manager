import React from 'react'
import Navbar from './assets/components/Navbar'
import Footer from './assets/components/Footer'
import Signup from './assets/components/Signup'
import Login from './assets/components/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Manager from './assets/components/Manager'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/Signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
        <Route path="/Manager" element={<Manager/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
