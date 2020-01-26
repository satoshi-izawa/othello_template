import React from 'react';
import { UserComponent } from 'src/components/user';
import { CounterComponent } from 'src/components/counter';

const style = require('./scss/header.scss');


/** ヘッダーコンテナコンポーネント */
export const Header = () => (
  <header className={style.header}>
    <CounterComponent user="black" />
    <UserComponent />
    <CounterComponent user="white" />
  </header>
);
