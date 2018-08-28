import React from 'react';
import PropTypes from 'prop-types';
import { mapDuxTableSearchProps, mapDuxTableSearchDispatch } from './maps/DuxTableSearch.map';
import { connect } from 'react-redux';

class DuxTableSearchUi extends React.Component {
    constructor(props) {
        super(props);

        this.input = null;
    }

    componentDidMount() {
        if (this.props.tableProps.searchFocus && this.input !== null) {
            this.input.focus();
        }
    }

    render() {
        if (!this.props.tableProps.showSearch) {
            return null;
        }

        return (
            <div className="duxtable-flex-row">
                <div className="duxtable-flex-col-grow">
                    <input className="duxtable-search"
                           placeholder="Search"
                           onChange={e => this.props.searchChanged(this.props.tableProps.name, e.target.value)}
                           ref={i => this.input=i}
                    />
                </div>
            </div>
        );
    }
}

DuxTableSearchUi.propTypes = {
    // Provided by component parent
    tableProps: PropTypes.object.isRequired,

    // Provided by Redux map
    searchChanged: PropTypes.func.isRequired
};

export const DuxTableSearch = connect(mapDuxTableSearchProps, mapDuxTableSearchDispatch)(DuxTableSearchUi);
