import React, { useEffect, useState } from 'react';
import FullCalendar, { EventInput } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
//import { supabase } from './supabaseClient'; // Supabaseクライアントをインポート
import { createClient } from '@/utils/supabase/server';

const Calendar = () => {
  const [events, setEvents] = useState<EventInput[]>([]);

  // Supabaseからイベントを取得する
  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from('schedules')
      .select('*');
    
    if (error) {
      console.error('Error fetching events:', error);
    } else {
      const formattedEvents = data.map((event) => ({
        id: event.id,
        title: event.title,
        start: event.start_time,
        end: event.end_time,
      }));
      setEvents(formattedEvents);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // イベントを追加するハンドラ
  const handleDateSelect = async (selectInfo: any) => {
    let title = prompt('イベントのタイトルを入力してください');
    if (title) {
      let calendarApi = selectInfo.view.calendar;
      calendarApi.unselect(); // カレンダーの選択をクリア

      // Supabaseにイベントを挿入
      const { data, error } = await supabase
        .from('schedules')
        .insert([
          { title, start_time: selectInfo.startStr, end_time: selectInfo.endStr }
        ]);

      if (error) {
        console.error('Error adding event:', error);
      } else {
        // カレンダーに新しいイベントを追加
        calendarApi.addEvent({
          id: data[0].id,
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
        });
      }
    }
  };

  return (
    <div>
      <h2>スケジュールカレンダー</h2>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        selectable={true}
        select={handleDateSelect} // 日付選択時のハンドラ
      />
    </div>
  );
};

export default Calendar;
