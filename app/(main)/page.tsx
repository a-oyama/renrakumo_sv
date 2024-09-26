// メインページ
'use client'

import FullCalendar from "@fullcalendar/react"
// 月カレンダー
import dayGridPlugin from '@fullcalendar/daygrid'
// 日を消す
import { DayCellContentArg } from "@fullcalendar/core/index.js"
// 日本語カレンダー
import allLocales from '@fullcalendar/core/locales-all'
// カレンダーをクリックできるようにする
import interactionPlugin from "@fullcalendar/interaction"
import { DateSelectArg } from "@fullcalendar/core/index.js"
// イベント取得
import { INITIAL_EVENTS, createEventId } from "@/utils/supabase/event"
import { useCallback, useState } from "react"
import { EventApi } from "@fullcalendar/core/index.js"



const MainPage = () => {
  // イベントオブジェクトの取得(予定データが初期化＆変更時に取得)
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  const handleEvents = useCallback((events: EventApi[]) => {
    console.log("events:", events);  // 確認用
    setCurrentEvents(events);
  }, []);

// 予定の入力(promit()でダイアログ表示,trimで表示調整,
// calendarApi = selectInfo.view.calendar)
  const handleDateSelect = useCallback((selectInfo: DateSelectArg) => {
    let title = prompt("イベントのタイトルを入力してください")?.trim();
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
    if (title) {

      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    
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
         />
      </div>
    </div>
  )
}

export default MainPage