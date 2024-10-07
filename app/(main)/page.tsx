// メインページ
'use client'

import React from 'react'
// Calendarインポート
import Calendar from './Calendar'
// Renrakuインポート
import Renraku from './Renraku'


const MainPage = () => {

  return (
    <div className="App">
      <Calendar />

      <div className="py-6">
        <h2 className="text-xl font-bold border-b-2 border-gray-400 pb-2 w-4/4">
          連絡事項
        </h2>
      </div>

      <Renraku />

      </div>
  );
};

export default MainPage;