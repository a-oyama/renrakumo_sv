
import { useCallback, useState, useEffect } from "react"
import { createClient } from "@/utils/supabase/client"


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
//import { INITIAL_EVENTS, createEventId } from "@/utils/supabase/event"


const Calendar = () => {

  const supabase = createClient()
  const [events, setEvents] = useState<EventInit[]>([]);

  // Supabase からデータを取得
  const fetchEvents = async () => {
    const { data, error } = await supabase.from('events').select('*');
    if (error) console.error(error);
    else setEvents(data);
  };

  // イベント登録
  const handleDateSelect = async (selectInfo: DateSelectArg) => {
    const title = prompt('イベントのタイトルを入力してください');
    const calendarApi = selectInfo.view.calendar;

    if (title) {
      const newEvent = {
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
      };

      const { data, error } = await supabase.from('events').insert([newEvent]);
      if (error) {
        console.error(error);
      } else {
        calendarApi.addEvent({
          id: data[0].id,  // Supabase で生成されたIDを使用
          ...newEvent,
        });
      }
    }
  };

  // イベント削除
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

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      selectable={true}
      events={events}
      select={handleDateSelect}
      eventClick={handleEventClick}
    />
  );

}


export default Calendar;
