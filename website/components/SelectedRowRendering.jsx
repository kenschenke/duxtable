import React from 'react';
import DuxTable from '../../src/DuxTable';
import { makeAddresses } from '../../address-helpers';

export class SelectedRowRendering extends React.Component {
    constructor(props) {
        super(props);

        this.addrs = makeAddresses().slice(0, 25);
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
                field: 'Name',
                title: 'Name'
            },
            {
                field: 'Addr',
                title: 'Address'
            },
            {
                field: 'CitySt',
                title: 'City, State'
            }
        ];
        return (
            <div className="example lightmode">
                <DuxTable name="selectedrowrendering"
                          columns={cols}
                          data={this.addrs}
                          striped={true}
                          rowKey="Id"
                          selectionMode="single"
                          selectedRenderCallback={this.selectedRender}
                />
            </div>
        );
    }
}
