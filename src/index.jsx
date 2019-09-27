import './main.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './store/reducers';
import LastNews from './components/last_news/LastNews';

const store = createStore(rootReducer);
ReactDOM.render(
  <Provider
    store={store}
  >
    <LastNews />
  </Provider>,
  document.getElementById('app'),
);
