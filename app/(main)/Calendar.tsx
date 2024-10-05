
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
import { EventClickArg } from "@fullcalendar/core/index.js"


const Calendar = () => {
  const supabase = createClient()
  const [events, setEvents] = useState<EventInit[]>([]);

  // Supabase からデータを取得
  const fetchEvents = async () => {
    const { data, error } = await supabase
    .from('events')
    .select('*');
    if (error)
       console.error(error);
       else setEvents(data);
// else setEvents(data.map(event => ({
//  ...event,
//  allDay: event.allDay,  // 終日フラグを反映
//})));
};
  // イベント登録
  const handleDateSelect = async (selectInfo: DateSelectArg) => {
    const title = prompt('イベントのタイトルを入力してください');
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();

    if (title) {

//      const isAllDay = selectInfo.allDay;

      const newEvent = {
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
//        allDay: selectInfo.allDay,
//        allDay: isAllDay,  // 終日イベントのフラグを設定

      };

      const { data, error } = await supabase
      .from('events')
      .insert([newEvent]);

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
      editable={true}
//      allDaySlot={true}  // 終日イベントの表示スロットを有効化
    />
  );

}


export default Calendar;
