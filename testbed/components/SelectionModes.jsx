import React from 'react';
import { DuxTable } from '../../src/DuxTable';
import { connect } from 'react-redux';
import { makeAddresses, makeStars } from '../../address-helpers';
import { getSelectedRows } from '../../src/helpers';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { agate } from 'react-syntax-highlighter/styles/hljs';

const mapProps = state => {
    return {
        selections: 'selectedRows = ' + JSON.stringify(getSelectedRows(state, 'selectionmodes'), null, 3)
    };
};

class SelectionModesUi extends React.Component {
    constructor(props) {
        super(props);

        this.addrs = makeAddresses();

        this.state = {
            selectionMode: 'none'
        };
    }

    render() {
        const cols = [
            {
                title: 'Name',
                field: 'Name'
            },
            {
                title: 'City, State',
                field: 'CitySt',
                width: 200
            }
        ];

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-8">
                        <div>
                            Selection Mode:
                            <select onChange={e => this.setState({selectionMode:e.target.value})} className="mb-2 ml-2">
                                <option defaultChecked={true} value="none">None</option>
                                <option value="single">Single Selection</option>
                                <option value="multi">Multiple Selection</option>
                            </select>
                            <DuxTable
                                name="selectionmodes"
                                columns={cols}
                                data={this.addrs}
                                fetchingData={false}
                                rowKey="Id"
                                selectionMode={this.state.selectionMode}
                                striped={true}
                            />
                        </div>
                    </div>
                    <div className="col">
                        <SyntaxHighlighter language="javascript" style={agate}>
                            {this.props.selections}
                        </SyntaxHighlighter>
                    </div>
                </div>
            </div>
        );
    }
}

export const SelectionModes = connect(mapProps)(SelectionModesUi);
