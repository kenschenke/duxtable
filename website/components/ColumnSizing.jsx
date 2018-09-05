import React from 'react';
import { DuxTable } from '../../src/DuxTable';
import { makeAddresses } from '../../address-helpers';

export class ColumnSizing extends React.Component {
    constructor(props) {
        super(props);

        this.addrs = makeAddresses().slice(0, 25).map((addr,index) => {
            return {
                Id: index,
                Name: addr.Name,
                Addr: addr.Addr,
                CitySt: addr.CitySt,
                Orders: Math.round(Math.random() * 1000)
            };
        });
    }

    render() {
        const cols = [
            {
                field: 'Name',
                title: 'Name',
            },
            {
                field: 'Addr',
                title: 'Address'
            },
            {
                field: 'CitySt',
                title: 'City, State',
                width: 200
            },
            {
                field: 'Orders',
                title: 'Orders',
                width: 100,
                align: 'right'
            }
        ];
        return (
            <div className="example lightmode">
                <DuxTable name="columnsizing"
                          rowKey="Id"
                          columns={cols}
                          data={this.addrs}
                          striped={true}
                />
            </div>
        );
    }
}
