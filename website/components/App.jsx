import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Topic } from './Topic';
import { NavBar } from './NavBar';

const appProps = state => {
    return {
        currentTopic: state.topic
    };
};

import IntroHtml from '../html/Intro.html';

import GettingStartedHtml from '../html/GettingStarted.html';

import BasicsHtml from '../html/Basics.html';

import { Paginated } from './Paginated';
import PaginatedHtml from '../html/Paginated.html';
import PaginatedSource from '../source/Paginated.txt';

import { FixedHeader } from './FixedHeader';
import FixedHeaderHtml from '../html/FixedHeader.html';
import FixedHeaderSource from '../source/FixedHeader.txt';

import { HeaderGroups } from './HeaderGroups';
import HeaderGroupsHtml from '../html/HeaderGroups.html';
import HeaderGroupsSource from '../source/HeaderGroups.txt';

import { Footers } from './Footers';
import FootersHtml from '../html/Footers.html';
import FootersSource from '../source/Footers.txt';

import { Selections } from './Selections';
import SelectionsHtml from '../html/Selections.html';
import SelectionsSource from '../source/Selections.txt';

import { RowSorting } from './RowSorting';
import RowSortingHtml from '../html/RowSorting.html';
import RowSortingSource from '../source/RowSorting.txt';

import { CellRendering } from './CellRendering';
import CellRenderingHtml from '../html/CellRendering.html';
import CellRenderingSource from '../source/CellRendering.txt';

import { SelectedRowRendering } from './SelectedRowRendering';
import SelectedRowRenderingHtml from '../html/SelectedRowRendering.html';
import SelectedRowRenderingSource from '../source/SelectedRowRendering.txt';

import { CustomizingAppearance } from './CustomizingAppearance';
import CustomizingAppearanceHtml from '../html/CustomizingAppearance.html';
import CustomizingAppearanceSource from '../source/CustomizingAppearance.txt';

import ReferenceHtml from '../html/Reference.html';

import HelperFunctionsHtml from '../html/HelperFunctions.html';

import { HiddenColumns } from './HiddenColumns';
import HiddenColumnsHtml from '../html/HiddenColumns.html';
import HiddenColumnsSource from '../source/HiddenColumns.txt';

const topics = [
    {
        topic: 'intro',
        html: IntroHtml
    },
    {
        topic: 'gettingstarted',
        html: GettingStartedHtml
    },
    {
        topic: 'basics',
        html: BasicsHtml
    },
    {
        topic: 'paginated',
        component: Paginated,
        html: PaginatedHtml,
        source: PaginatedSource
    },
    {
        topic: 'fixedheader',
        component: FixedHeader,
        html: FixedHeaderHtml,
        source: FixedHeaderSource
    },
    {
        topic: 'headergroups',
        component: HeaderGroups,
        html: HeaderGroupsHtml,
        source: HeaderGroupsSource
    },
    {
        topic: 'footers',
        component: Footers,
        html: FootersHtml,
        source: FootersSource
    },
    {
        topic: 'selections',
        component: Selections,
        html: SelectionsHtml,
        source: SelectionsSource
    },
    {
        topic: 'rowsorting',
        component: RowSorting,
        html: RowSortingHtml,
        source: RowSortingSource
    },
    {
        topic: 'cellrendering',
        component: CellRendering,
        html: CellRenderingHtml,
        source: CellRenderingSource
    },
    {
        topic: 'selectedrowrendering',
        component: SelectedRowRendering,
        html: SelectedRowRenderingHtml,
        source: SelectedRowRenderingSource
    },
    {
        topic: 'customizingappearance',
        component: CustomizingAppearance,
        html: CustomizingAppearanceHtml,
        source: CustomizingAppearanceSource
    },
    {
        topic: 'reference',
        html: ReferenceHtml
    },
    {
        topic: 'helperfunctions',
        html: HelperFunctionsHtml
    },
    {
        topic: 'hiddencols',
        component: HiddenColumns,
        html: HiddenColumnsHtml,
        source: HiddenColumnsSource
    }
];

const AppUi = props => {
    const topicComponents = topics.map(topic => {
        return (
            <Topic
                show={topic.topic === props.currentTopic}
                key={topic.topic}
                topic={topic.topic}
                component={topic.component}
                source={topic.source}
                html={topic.html}
            />
        );
    });

    return (
        <div className="container">
            <NavBar/>
            {topicComponents}
        </div>
    );
};

AppUi.propTypes = {
    currentTopic: PropTypes.string.isRequired
};

export const App = connect(appProps)(AppUi);
