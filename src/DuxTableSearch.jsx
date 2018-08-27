import React from 'react';
import PropTypes from 'prop-types';

export class DuxTableSearch extends React.Component {
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
                           onChange={e => this.props.searchChanged(e.target.value)}
                           ref={i => this.input=i}
                    />
                </div>
            </div>
        );
    }
}

DuxTableSearch.propTypes = {
    tableProps: PropTypes.object.isRequired,
    searchChanged: PropTypes.func.isRequired
};
