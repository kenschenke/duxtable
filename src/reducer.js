import C from './constants';
import _ from 'lodash';

export default (state={}, action) => {
    let newState;

    switch (action.type) {
        case C.DUXTABLE_SET_DATA:
            newState = _.cloneDeep(state);
            if (!newState.hasOwnProperty(action.table)) {
                newState[action.table] = action.data;
            } else {
                newState[action.table] = _.assign(newState[action.table], action.data);
            }
            return newState;

        default:
            return state;
    }
};
