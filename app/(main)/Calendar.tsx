
import { useCallback, useState, useEffect } from "react"
import FullCalendar from "@fullcalendar/react"
// 月カレンダー
import dayGridPlugin from '@fullcalendar/daygrid'
// 日を消す
import { DayCellContentArg } from "@fullcalendar/core/index.js"
// 日本語カレンダー
import allLocales from '@fullcalendar/core/locales-all'
// カレンダーをクリックできるようにする
// スマホは長押し(selectLongPressDelay)
import interactionPlugin from "@fullcalendar/interaction"
import { DateSelectArg } from "@fullcalendar/core/index.js"
import { EventClickArg, EventApi } from "@fullcalendar/core/index.js"
// イベント取得
import { INITIAL_EVENTS, createEventId } from "@/utils/supabase/event"


const Calendar = () => {
  // イベントオブジェクトの取得(予定データが初期化＆変更時に取得)
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  const handleEvents = useCallback((events: EventApi[]) => {
    console.log("events:", events);  // 確認用
    setCurrentEvents(events);
  }, []);

// 予定の入力(promit()でダイアログ表示,trimで表示調整,
// calendarApi = selectInfo.view.calendar)
  const handleDateSelect = useCallback((selectInfo: DateSelectArg) => {
    let title = prompt("イベント名を入力してください")?.trim();
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
    if (title) {

      calendarApi.addEvent({
        event_id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
//        allDay: selectInfo.allDay,
        allDay: true,
      });
    
    }
  }, []);

// 予定の削除(Y/Nをwindow.confirm())
const handleEventClick = useCallback((clickInfo: EventClickArg) => {
  if (
    window.confirm(`このイベント「${clickInfo.event.title}」を削除しますか`)
  ) {
    clickInfo.event.remove();
  }
}, []);

  return (
    <div>
      <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        initialEvents={INITIAL_EVENTS}
        height="auto"
        locales={allLocales}
        locale="jp"
        dayCellContent={(event: DayCellContentArg) =>
          (event.dayNumberText = event.dayNumberText.replace("日", ""))
        }
        selectable={true}
        select={handleDateSelect}
        editable={true}
        eventClick={handleEventClick}
         />
      </div>
    </div>
  )
}


export default Calendar;
