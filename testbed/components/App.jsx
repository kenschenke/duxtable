import React from 'react';
import { Section } from './Section';
import { ScrollNoFooter } from './ScrollNoFooter';
import { PaginatedNoFooter } from './PaginatedNoFooter';

export const App = () => (
    <div>
        <Section title="Fixed Headers Without Footer" component={ScrollNoFooter} name="scrollnofooter"/>
        <Section title="Paginated Without Footer" component={PaginatedNoFooter} name="paginatednofooter"/>
    </div>
);
