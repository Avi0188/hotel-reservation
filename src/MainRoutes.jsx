import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Reservation from './components/Reservation'
import Hotel from './components/Hotel'
import ViewReservation from './components/ViewReservation'

const MainRoutes = () => {
  return (
    <Routes>
  

      <Route path="/hotels" element={<Hotel />} />
      <Route path="/" element={<Hotel />} />
      <Route path="/hotel/:id" element={<Hotel/>} />
      <Route path="booking" element={<ViewReservation />} />
    
  </Routes>
  )
}

export default MainRoutes
