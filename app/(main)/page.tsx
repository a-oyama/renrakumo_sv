'use client'
// メインページ
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from '@fullcalendar/daygrid'
//カレンダーの日付を消す
import { DayCellContentArg } from "@fullcalendar/core/index.js"

const MainPage = () => {
  return (
    <div>
      <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        height="auto"
        locale="jp"
        dayCellContent={(event: DayCellContentArg) =>
          (event.dayNumberText = event.dayNumberText.replace("日", ""))
        }
         />
      </div>
    </div>
  )
}

export default MainPage