// メインページ
import React from 'react'
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from '@fullcalendar/daygrid'

const MainPage = () => {
    return (
      <div>
        <div>メインページ</div>
        <div>
          
        <FullCalendar
         plugins={[dayGridPlugin]}
         initialView="dayGridMonth" />
        </div>
      </div>
    )
  }
  
  export default MainPage