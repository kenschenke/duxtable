import React from 'react';
import DuxTable from '../../src/DuxTable';

export class Paginated extends React.Component {
    constructor(props) {
        super(props);

        this.rows = [];
        for (let i = 1; i <= 25; i++) {
            this.rows.push({
                Id: i,
                First: `First Column Row ${i}`,
                Second: `Second Column Row ${i}`,
                Third: `Third Column Row ${i}`
            });
        }
    }

    render() {
        const cols = [
            {
                field: 'First',
                title: 'First Column'
            },
            {
                field: 'Second',
                title: 'Second Column'
            },
            {
                field: 'Third',
                title: 'Third Column'
            }
        ];

        return (
            <div className="example lightmode">
                <DuxTable name="pagination" columns={cols} rowKey="Id" data={this.rows} striped={true}/>
            </div>
        );
    }
}
