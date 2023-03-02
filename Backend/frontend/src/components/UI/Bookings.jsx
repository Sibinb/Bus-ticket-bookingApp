import React from 'react'
import '../../styles/booking.css'
import BookItem from './BookItem'
function Bookings() {
  return (
    <div className='booking-div'> 
         <div className="booking__header">
            <h2> YOUR BOOKINGS</h2>
         </div>
         <div className="booking__body">
            <BookItem/>
            <BookItem/>
            <BookItem/>
         </div>
    </div>
  )
}

export default Bookings