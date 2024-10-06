import { useState, useEffect } from "react"
import { createClient } from "@/utils/supabase/client"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { DayCellContentArg } from "@fullcalendar/core/index.js"
import allLocales from '@fullcalendar/core/locales-all'
import interactionPlugin from "@fullcalendar/interaction"
import { DateSelectArg } from "@fullcalendar/core/index.js"
import { EventClickArg } from "@fullcalendar/core/index.js"


const Calendar = () => {
  const supabase = createClient() //supabase連携
  const [events, setEvents] = useState<EventInit[]>([]); //状態管理

// useEffectでデータ管理
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
      };

      const { data, error } = await supabase
      .from('events')
      .insert([newEvent]);

         if (error || !data || data.length === 0) { // if文でundefind防止
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
      }   
      select={handleDateSelect}
      eventClick={handleEventClick}
      displayEventTime={false}
      businessHours={true}
    />
  );
}

export default Calendar;