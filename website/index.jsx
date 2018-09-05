import { Provider } from 'react-redux';
import React from 'react';
import { render } from 'react-dom';
import initialState from './initialState.json';
import storeFactory from './store';
import { App } from './components/App.jsx';
import '../src/duxtable.css';

const store = storeFactory(initialState);

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('react-container')
);
