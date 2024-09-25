'use client'
// メインページ
import React from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from '@fullcalendar/daygrid'

const MainPage = () => {
  return (
    <div>
      <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        height="auto"
        locale="jp"
         />
      </div>
    </div>
  )
}

export default MainPage