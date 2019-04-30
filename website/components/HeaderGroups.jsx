import React from 'react';
import DuxTable from '../../src/DuxTable';

export class HeaderGroups extends React.Component {
    constructor(props) {
        super(props);

        this.rows = [];
        for (let i = 1; i <= 25; i++) {
            this.rows.push({
                Id: i,
                FirstName: `First Name Row ${i}`,
                LastName: `Last Name Row ${i}`,
                Title: `Title Row ${i}`,
                Office: `Office Row ${i}`,
                Floor: `Floor Row ${i}`,
                Building: `Building Row ${i}`,
                Phone: `Phone Row ${i}`,
                Fax: `Fax Row ${i}`,
                Email: `Email Row ${i}`
            });
        }
    }

    render() {
        const cols = [
            {
                field: 'FirstName',
                title: 'First Name',
            },
            {
                field: 'LastName',
                title: 'Last Name',
            },
            {
                field: 'Title',
                title: 'Title',
            },
            {
                field: 'Office',
                title: 'Office',
            },
            {
                field: 'Floor',
                title: 'Floor',
            },
            {
                field: 'Building',
                title: 'Building',
            },
            {
                field: 'Phone',
                title: 'Phone',
            },
            {
                field: 'Fax',
                title: 'Fax',
            },
            {
                field: 'Email',
                title: 'Email',
            },
        ];
        const headerGroups = [
            {
                startCol: 0,
                endCol: 2,
                title: 'Name'
            },
            {
                startCol: 3,
                endCol: 5,
                title: 'Location'
            },
            {
                startCol: 6,
                title: 'Contact'
            }
        ];

        return (
            <div className="example lightmode">
                <DuxTable name="headergroups" columns={cols} groupHeaders={headerGroups} rowKey="Id" data={this.rows} striped={true}/>
            </div>
        );
    }
}
