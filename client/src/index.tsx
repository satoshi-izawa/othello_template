import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from 'src/store';
import { BoardContainer } from './components/board';

import './index.scss';

(() => {
  const appElem = document.getElementById('app');
  ReactDOM.render(
    <Provider store={store}>
      <BoardContainer />
    </Provider>, appElem,
  );
})();
