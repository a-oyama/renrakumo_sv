
// プロフィール型
export interface ProfileType {
    id: string
    name: string
    introduce: string | null
    avatar_url: string | null
  }

  // カレンダースケジュール
  export interface Event {
    id: string;
    title: string;
    start_time: string;
    end_time: string | null;
  }
