// メインページ
'use client'

import React from 'react';
import Calendar from './Calendar'; // Calendar コンポーネントをインポート
import Renraku from './Renraku'; // Renraku コンポーネントをインポート


const MainPage = () => {

  return (
    <div className="App">
      <Calendar />
      <Renraku />
    </div>
  );
};

export default MainPage;