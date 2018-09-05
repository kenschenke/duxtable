import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import C from '../constants';

const mapProps = state => {
    return {

    };
};

const mapDispatch = dispatch => {
    return {
        topicClicked(topic) {
            dispatch({
                type: C.SET_TOPIC,
                payload: topic
            });
        }
    };
};

const NavBarUi = props => {
    return (
        <nav className="navbar navbar-dark navbar-expand-lg">
            <a className="navbar-brand" href="#">
                <img src="duxtable.png" height={30} className="d-inline-block align-top mr-2"/>
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbar">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="#" onClick={e => {e.preventDefault(); props.topicClicked('intro')}}>Welcome</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#" onClick={e => {e.preventDefault(); props.topicClicked('gettingstarted')}}>Getting Started</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#" onClick={e => {e.preventDefault(); props.topicClicked('basics')}}>DuxTable Basics</a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup={true} aria-expanded={false}>Learn More</a>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" href="#" onClick={e => {e.preventDefault(); props.topicClicked('paginated')}}>Paginated Tables</a>
                            <a className="dropdown-item" href="#" onClick={e => {e.preventDefault(); props.topicClicked('fixedheader')}}>Fixed-Header Scrolling Tables</a>
                            <a className="dropdown-item" href="#" onClick={e => {e.preventDefault(); props.topicClicked('headergroups')}}>Header Groups</a>
                            <a className="dropdown-item" href="#" onClick={e => {e.preventDefault(); props.topicClicked('footers')}}>Table Footers</a>
                            <a className="dropdown-item" href="#" onClick={e => {e.preventDefault(); props.topicClicked('selections')}}>Single and Multi Selections</a>
                            <a className="dropdown-item" href="#" onClick={e => {e.preventDefault(); props.topicClicked('columnsizing')}}>Column Sizing</a>
                            <a className="dropdown-item" href="#" onClick={e => {e.preventDefault(); props.topicClicked('rowsorting')}}>Row Sorting</a>
                            <a className="dropdown-item" href="#" onClick={e => {e.preventDefault(); props.topicClicked('cellrendering')}}>Custom Cell Rendering</a>
                            <a className="dropdown-item" href="#" onClick={e => {e.preventDefault(); props.topicClicked('selectedrowrendering')}}>Selected Row Rendering</a>
                            <a className="dropdown-item" href="#" onClick={e => {e.preventDefault(); props.topicClicked('customizingappearance')}}>Customizing Appearance</a>
                            <a className="dropdown-item" href="#" onClick={e => {e.preventDefault(); props.topicClicked('intro')}}>Custom Table Component Rendering</a>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#" onClick={e => {e.preventDefault(); props.topicClicked('intro')}}>Examples</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#" onClick={e => {e.preventDefault(); props.topicClicked('intro')}}>Reference</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

NavBarUi.propTypes = {
    topicClicked: PropTypes.func.isRequired
};

export const NavBar = connect(mapProps, mapDispatch)(NavBarUi);
