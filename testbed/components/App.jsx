import React from 'react';
import { Section } from './Section';
import DevTools from './DevTools.jsx';
import { ScrollNoFooter } from './ScrollNoFooter';
import { PaginatedNoFooter } from './PaginatedNoFooter';

export const App = () => (
    <div>
        <Section title="Fixed Headers Without Footer" component={ScrollNoFooter} name="scrollnofooter"/>
        <Section title="Paginated Without Footer" component={PaginatedNoFooter} name="paginatednofooter"/>
        {/*<DevTools/>*/}
    </div>
);
