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

import { Basics } from './Basics';
import BasicsHtml from '../html/Basics.html';
import BasicsSource from '../source/Basics.txt';

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

import { ColumnSizing } from './ColumnSizing';
import ColumnSizingHtml from '../html/ColumnSizing.html';
import ColumnSizingSource from '../source/ColumnSizing.txt';

import { RowSorting } from './RowSorting';
import RowSortingHtml from '../html/RowSorting.html';
import RowSortingSource from '../source/RowSorting.txt';

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
        component: Basics,
        html: BasicsHtml,
        source: BasicsSource
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
        topic: 'columnsizing',
        component: ColumnSizing,
        html: ColumnSizingHtml,
        source: ColumnSizingSource
    },
    {
        topic: 'rowsorting',
        component: RowSorting,
        html: RowSortingHtml,
        source: RowSortingSource
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
