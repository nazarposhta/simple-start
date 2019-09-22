import "./main.scss";
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import {rootReducer} from "./store/reducers";
import {Provider} from "react-redux";
import LastNews from './components/last_news/LastNews.jsx';

const store = createStore(rootReducer);
ReactDOM.render(
    <Provider store={store}>
        <LastNews/>
    </Provider>,
    document.getElementById('app')
);