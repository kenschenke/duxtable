import C from '../constants';
import { combineReducers } from 'redux';
import { DuxTableReducer } from "../../src/reducer";

const topicReducer = (state='', action) => {
    switch (action.type) {
        case C.SET_TOPIC:
            return action.payload;

        default:
            return state;
    }
};

export default combineReducers({
    topic: topicReducer,
    duxtable: DuxTableReducer
});
