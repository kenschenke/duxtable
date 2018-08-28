import React from 'react';
import { DuxTable } from '../../src/DuxTable';
import { makeAddresses, makeStars } from '../../address-helpers.jsx';

export class ScrollNoFooter extends React.Component {
    constructor(props) {
        super(props);

        // Generate between 100 and 500 random addresses
        this.addrs = makeAddresses().slice(0, Math.floor(Math.random()*400)+100);

        this.state = {
            fetching: false
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
                <input type="checkbox" className="mb-3" onClick={() => this.setState({fetching:!this.state.fetching})}/> Fetching Data
                <DuxTable
                    name="scrollnofooter"
                    columns={cols}
                    data={this.addrs}
                    emptyMsg="No addresses found"
                    fetchingData={this.state.fetching}
                    fetchingMsg="Fetching addresses"
                    rowKey="Id"
                    selectionMode="single"
                    sortColumn={3}
                    sortAscending={false}
                    striped={true}
                    pagination={false}
                    bodyHeight={300}
                    selectedRenderCallback={this.selectedRender}
                />
            </div>
        );
    }
}
