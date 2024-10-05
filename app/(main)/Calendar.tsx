
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
  // 状態の確認
  const [events, setEvents] = useState<EventInit[]>([]);
  
  // 初期化
useEffect(() => {
  fetchEvents();
}, []);

  // Supabase からデータを取得
  const fetchEvents = async () => {
    const { data, error } = await supabase
    .from('events')
    .select('*');

    if (error)
       console.error(error);
       else setEvents(data);
};

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
//        allDay: true,
      };

      const { data, error } = await supabase
      .from('events')
      .insert([newEvent]);

/*       if (error) {
        console.error('データの挿入に失敗しました:', error)
      } else {

        calendarApi.addEvent({
          id: data[0].id,  // Supabase で生成されたIDを使用
          ...newEvent,
        }); */

        // if文でdataがnullでないことを確認
         if (error || !data || data.length === 0) { // data の存在を確認
          console.error('データの挿入に失敗しました:', error);
        } else {
          calendarApi.addEvent({
            id: data[0].id,
            ...newEvent,
          });
/*           if (error || !data || data.length === 0) {
            console.error('データの挿入に失敗しました:', error);
          } else {
            // `events` ステートを更新して、新しいイベントを追加する
            setEvents((prevEvents) => [
              ...prevEvents,
              { id: data[0].id, ...newEvent },
            ]); */
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
      displayEventTime={false}  // 時間の表示を無効化し終日とする
      dayMaxEvents={true}
    />
  );

}


export default Calendar;
