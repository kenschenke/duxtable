import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import storeFactory from './store';
import { App } from './components/App.jsx';

const store = storeFactory({});

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('react-container')
);
