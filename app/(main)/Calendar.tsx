import { useState, useEffect } from "react"
import { createClient } from "@/utils/supabase/client"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { DayCellContentArg } from "@fullcalendar/core/index.js"
import allLocales from '@fullcalendar/core/locales-all'
import interactionPlugin from "@fullcalendar/interaction"
import { DateSelectArg } from "@fullcalendar/core/index.js"
import { EventClickArg } from "@fullcalendar/core/index.js"


// カレンダー日マス設定
const addDayClassNames = (arg: DayCellContentArg) => {
  const day = arg.date.getDay();
  if (day === 6) return ["saturday-cell"]; // 土曜
  if (day === 0) return ["sunday-cell"];   // 日曜
  return [];
};

const Calendar = () => {
  const supabase = createClient() //supabase連携
  const [events, setEvents] = useState<EventInit[]>([]); //状態管理

// useEffectとfetchでsupabaseデータ取得
useEffect(() => {
  fetchEvents();
}, []);

// supabase_eventテーブル取得
  const fetchEvents = async () => {
    const { data, error } = await supabase
    .from('events')
    .select('*');

    if (error)
       console.error(error);
    else setEvents(data);
};

  const handleDateSelect = async (selectInfo: DateSelectArg) => {

    const title = prompt('イベントのタイトルを入力してください');
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();

    if (title) {

      const newEvent = {
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      };

      const { data, error } = await supabase
      .from('events')
      .insert([newEvent]);

      // 処理終了時にsupabase再度取得
         if (error || !data ) { // if文でundefind防止
          console.error('データの挿入に失敗しました:', error);
        } else {
          fetchEvents();
      }
      window.location.reload(); //処理終了時にリロード
    }
  };

  const handleEventClick = async (clickInfo: EventClickArg) => {
    if (window.confirm(`'${clickInfo.event.title}' を削除しますか？`)) {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', clickInfo.event.id);

      if (error) {
        console.error(error);
      } else {
        clickInfo.event.remove();
      }
    }
  };


  // 画面
  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      height="auto"
      selectable={true}
      events={events}
      locales={allLocales}
      locale="jp"
      dayCellContent={(event: DayCellContentArg) =>
        (event.dayNumberText = event.dayNumberText.replace("日", ""))
      }// 日を消す
      dayCellClassNames={addDayClassNames}//土日配色
      select={handleDateSelect}
      eventClick={handleEventClick}
      displayEventTime={false}
      businessHours={true}
      
    />
  );
}


export default Calendar;