import React from 'react';
import { Section } from './Section';
import DevTools from './DevTools.jsx';
import { ScrollNoFooter } from './ScrollNoFooter';
import { PaginatedNoFooter } from './PaginatedNoFooter';
import { SelectionModes } from './SelectionModes';
import { CellRendering } from './CellRendering';
import { HiddenColumns } from './HiddenColumns';

export const App = () => (
    <div>
        <Section title="Fixed Headers Without Footer" component={ScrollNoFooter} name="scrollnofooter"/>
        <Section title="Paginated Without Footer" component={PaginatedNoFooter} name="paginatednofooter"/>
        <Section title="Selection Modes" component={SelectionModes} name="selectionmodes"/>
        <Section title="Cell Rendering / Column Sorting" component={CellRendering} name="cellrendering"/>
        <Section title="Hidden Columns" component={HiddenColumns} name="hiddencols"/>
        {/*<DevTools/>*/}
    </div>
);
