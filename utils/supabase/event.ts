import { EventInput } from "@fullcalendar/core/index.js";
import { createClient } from "./client";


let eventGuid = 0;
const todayStr = new Date().toISOString().replace(/T.*$/, "");  // 今日の日付をYYYY-MM-DD形式にする
export const createEventId = () => String(eventGuid++);

// supabaseテーブルから取得できるようにする
export const INITIAL_EVENTS: EventInput[] = [
   {
    event_id: createEventId(),
    title: "All-day event",
    start: todayStr,
  },
  {
    event_id: createEventId(),
    title: "Timed event",
    start: todayStr + "T12:00:00",  // 時刻はTで結ぶ
  }, 
];
