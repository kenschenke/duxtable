import React from 'react';
import { DuxTable } from '../../src/DuxTable';
import { makeAddresses, makeStars } from '../../address-helpers.jsx';

export class PaginatedNoFooter extends React.Component {
    constructor(props) {
        super(props);

        this.addrs = makeAddresses();

        this.state = {
            fetching: false,
            showSearch: true,
            striped: true
        };
    }

    selectedRender = (item, colNum) => {
        if (colNum !== -1) {
            return undefined;
        }

        return (
            <div>
                <button type="button" className="btn btn-sm ml-5">Edit</button>
                <button type="button" className="btn btn-sm btn-danger ml-2">Delete</button>
            </div>
        );
    };

    render() {
        const cols = [
            {
                title: 'Name',
                field: 'Name'
            },
            {
                title: 'Address',
                field: 'Addr'
            },
            {
                title: 'City, State',
                field: 'CitySt',
                width: 200
            },
            {
                title: 'Rating',
                field: 'Rating',
                width: 125,
                render: d => makeStars(d.Rating)
            }
        ];
        return (
            <div>
                <div className="mb-3">
                    <input type="checkbox" onClick={() => this.setState({fetching:!this.state.fetching})}/> Fetching Data
                    <input type="checkbox" className="ml-3" defaultChecked={true} onClick={() => this.setState({showSearch:!this.state.showSearch})}/> Show Search
                    <input type="checkbox" className="ml-3" defaultChecked={true} onClick={() => this.setState({striped:!this.state.striped})}/> Striped
                </div>
                <DuxTable
                    name="paginatednofooter"
                    columns={cols}
                    data={this.addrs}
                    emptyMsg="No addresses found"
                    fetchingData={this.state.fetching}
                    fetchingMsg="Fetching addresses"
                    rowKey="Id"
                    selectionMode="single"
                    sortColumn={3}
                    sortAscending={false}
                    striped={this.state.striped}
                    selectedRenderCallback={this.selectedRender}
                    showSearch={this.state.showSearch}
                />
            </div>
        );
    }
}
