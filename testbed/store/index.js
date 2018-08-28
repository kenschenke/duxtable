import appReducer from './appReducer';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import DevTools from '../components/DevTools.jsx';

const enhancer = compose(
    applyMiddleware(thunk),
    DevTools.instrument()
);

export default function configureStore(initialState={}) {
    return createStore(appReducer, initialState, enhancer);
}
