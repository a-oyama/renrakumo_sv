
import { useCallback, useState, useEffect, useRef } from "react"
import { createClient } from "@/utils/supabase/client"

import FullCalendar, { CalendarApi } from '@fullcalendar/react'
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
//  const [events, setEvents] = useState([]);  // カレンダーのイベント状態管理
//  const calendarRef = useRef<CalendarApi>(null);

  

  // Supabase からデータを取得
  const fetchEvents = async () => {
    const { data, error } = await supabase
    .from('events')
    .select('*');
    if (error)
       console.error(error);
       else setEvents(data);
};

// 初回レンダリング時にイベントデータを取得
useEffect(() => {
  fetchEvents();
}, []);

  // イベント登録
  const handleDateSelect = async (selectInfo: DateSelectArg) => {
    
    if (!selectInfo) {
      console.error('selectInfo が null です。');
      return;
    }

    const title = prompt('イベントのタイトルを入力してください');
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();

    if (title) {

      const newEvent = {
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
//        allDay: selectInfo.allDay ?? true,
      };

      const { data, error } = await supabase
      .from('events')
      .insert([newEvent]);

      if (error) {
//  if (error || !data || data.length === 0) {
        console.error('データの挿入に失敗しました:', error)
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
//      displayEventTime={false}  // 時間の表示を無効化
//      selectMirror={true}
//      dayMaxEvents={true}
    />
  );

}


export default Calendar;
