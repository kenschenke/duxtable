import React from 'react';
import { DuxTable } from '../../src/DuxTable';
import {makeAddresses, makeStars} from '../../address-helpers';

export class CellRendering extends React.Component {
    constructor(props) {
        super(props);

        const addrs = makeAddresses();
        const now = Date.now();
        this.rows = addrs.map(addr => {
            const days = Math.round(Math.random() * 180);
            const lastUsed = new Date();
            lastUsed.setTime(now - 24 * 60 * 60 * 1000 * days);
            return {
                Name: addr.Name,
                Addr: addr.Addr,
                CitySt: addr.CitySt,
                LastUsed: lastUsed
            };
        });
        this.dateFmt = new Intl.DateTimeFormat('en-US');
    }

    compDate = (item1, item2, ascending) => {
        if (item1.LastUsed.getTime() > item2.LastUsed.getTime()) {
            return ascending ? 1 : -1;
        } else if (item1.LastUsed.getTime() < item2.LastUsed.getTime()) {
            return ascending ? -1 : 1;
        } else {
            return 0;
        }
    };

    render() {
        const cols = [
            {
                title: 'Name',
                field: 'Name',
                sortable: true
            },
            {
                title: 'Address (Not Sortable)',
                field: 'Addr',
                sortable: false
            },
            {
                title: 'City, State',
                field: 'CitySt',
                width: 200,
                sortable: true
            },
            {
                title: 'LastUsed',
                field: 'Last Used',
                width: 125,
                render: item => this.dateFmt.format(item.LastUsed),
                sortable: true,
                sortCallback: this.compDate
            }
        ];

        return (
            <div>
                <DuxTable
                    name="cellrendering"
                    columns={cols}
                    data={this.rows}
                    emptyMsg="No addresses found"
                    rowKey="Id"
                    selectionMode="none"
                    striped={true}
                />
            </div>
        );
    }
}
