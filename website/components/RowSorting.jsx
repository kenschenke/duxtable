import React from 'react';
import { DuxTable } from '../../src/DuxTable';
import { makeAddresses } from '../../address-helpers';

export class RowSorting extends React.Component {
    constructor(props) {
        super(props);

        this.addrs = makeAddresses().slice(0, 25).map((addr,index) => {
            const now = new Date();
            now.setTime(now.getTime() - Math.round(Math.random() * 365) * 1000 * 60 * 60 * 24);
            return {
                Id: index,
                Name: addr.Name,
                Addr: addr.Addr,
                CitySt: addr.CitySt,
                LastUsed: now
            };
        });
    }

    render() {
        const fmt = new Intl.DateTimeFormat();
        const cols = [
            {
                field: 'Name',
                title: 'Name'
            },
            {
                field: 'Addr',
                title: 'Address',
                sortable: false
            },
            {
                field: 'CitySt',
                title: 'City, State'
            },
            {
                title: 'Last Used',
                render: item => fmt.format(item.LastUsed),
                sortCallback: (item1, item2, ascending) => {
                    if (item1.LastUsed > item2.LastUsed) {
                        return ascending ? 1 : -1;
                    } else if (item1.LastUsed < item2.LastUsed) {
                        return ascending ? -1 : 1;
                    } else {
                        return 0;
                    }
                }
            }
        ];

        return (
            <div className="example lightmode">
                <DuxTable name="rowsorting"
                          columns={cols}
                          data={this.addrs}
                          striping={true}
                          sortColumn={3}
                          sortAscending={false}
                          rowKey="Id"
                />
            </div>
        );
    }
}
