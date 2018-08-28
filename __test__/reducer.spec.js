import C from '../src/constants';
import { DuxTableReducer } from '../src/reducer';

describe('DuxTableReducer tests', () => {
    test('table does not exist', () => {
        const startingState = {
            table1: {value1: 'value1'}
        };
        const expectedState = {
            table1: {value1: 'value1'},
            table2: {value2: 'value2'}
        };

        const before = JSON.stringify(startingState);
        const actualState = DuxTableReducer(startingState, {
            type: C.DUXTABLE_SET_DATA,
            table: 'table2',
            data: {value2: 'value2'}
        });
        const after = JSON.stringify(startingState);
        expect(after).toEqual(before);
        expect(actualState).toEqual(expectedState);
    });

    test('add scalar value', () => {
        const startingState = {
            table1: {value1: 'value1'},
            table2: {value2: 'value2'}
        };
        const expectedState = {
            table1: {value1: 'value1'},
            table2: {value2: 'value2', value3: 'value3'}
        };

        const before = JSON.stringify(startingState);
        const actualState = DuxTableReducer(startingState, {
            type: C.DUXTABLE_SET_DATA,
            table: 'table2',
            data: {value3: 'value3'}
        });
        const after = JSON.stringify(startingState);
        expect(after).toEqual(before);
        expect(actualState).toEqual(expectedState);
    });

    test('update scalar value', () => {
        const startingState = {
            table1: {value1: 'value1'},
            table2: {value2: 'value2', value3: 'value3'}
        };
        const expectedState = {
            table1: {value1: 'value1'},
            table2: {value2: 2, value3: 'value3'}
        };

        const before = JSON.stringify(startingState);
        const actualState = DuxTableReducer(startingState, {
            type: C.DUXTABLE_SET_DATA,
            table: 'table2',
            data: {value2: 2}
        });
        const after = JSON.stringify(startingState);
        expect(after).toEqual(before);
        expect(actualState).toEqual(expectedState);
    });

    test('add array value', () => {
        const startingState = {
            table1: {value1: 'value1'},
            table2: {value2: 'value2'}
        };
        const expectedState = {
            table1: {value1: 'value1'},
            table2: {value2: 'value2', array3: [1, 2, 3]}
        };

        const before = JSON.stringify(startingState);
        const actualState = DuxTableReducer(startingState, {
            type: C.DUXTABLE_SET_DATA,
            table: 'table2',
            data: {array3: [1, 2, 3]}
        });
        const after = JSON.stringify(startingState);
        expect(after).toEqual(before);
        expect(actualState).toEqual(expectedState);
    });

    test('update array value adding elements', () => {
        const startingState = {
            table1: {value1: 'value1'},
            table2: {array2: [1, 2], array3: [1, 2, 3]}
        };
        const expectedState = {
            table1: {value1: 'value1'},
            table2: {array2: [1, 2, 3, 4], array3: [1, 2, 3]}
        };

        const before = JSON.stringify(startingState);
        const actualState = DuxTableReducer(startingState, {
            type: C.DUXTABLE_SET_DATA,
            table: 'table2',
            data: {array2: [1, 2, 3, 4]}
        });
        const after = JSON.stringify(startingState);
        expect(after).toEqual(before);
        expect(actualState).toEqual(expectedState);
    });

    test('update array value removing elements', () => {
        const startingState = {
            table1: {value1: 'value1'},
            table2: {array2: [1, 2, 3, 4], array3: [1, 2, 3]}
        };
        const expectedState = {
            table1: {value1: 'value1'},
            table2: {array2: [1, 2], array3: [1, 2, 3]}
        };

        const before = JSON.stringify(startingState);
        const actualState = DuxTableReducer(startingState, {
            type: C.DUXTABLE_SET_DATA,
            table: 'table2',
            data: {array2: [1, 2]}
        });
        const after = JSON.stringify(startingState);
        expect(after).toEqual(before);
        expect(actualState).toEqual(expectedState);
    });
});
