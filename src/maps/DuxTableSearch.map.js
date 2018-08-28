import { setTableStoreValue } from '../actions';

export const mapDuxTableSearchProps = state => {
    return {

    };
};

export const mapDuxTableSearchDispatch = dispatch => {
    return {
        searchChanged(name, filter) {
            dispatch(setTableStoreValue(name, {filter: filter}));
        }
    };
};
