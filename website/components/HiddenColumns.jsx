import React from 'react';
import DuxTable from '../../src/DuxTable';

export class HiddenColumns extends React.Component {
    constructor(props) {
        super(props);

        this.rows = [];
        for (let i = 1; i <= 25; i++) {
            this.rows.push({
                index: i,
                colXs: `Row ${i}, Column Xs`,
                colSm: `Row ${i}, Column Sm`,
                colMd: `Row ${i}, Column Md`,
                colLg: `Row ${i}, Column Lg`,
                colXl: `Row ${i}, Column Xl`,
            });
        }
    }

    render() {
        const cols = [
            {
                title: 'Column Xs',
                field: 'colXs'
            },
            {
                title: 'Column Sm',
                field: 'colSm',
                hidden: {
                    xs: true,
                    sm: false,
                }
            },
            {
                title: 'Column Md',
                field: 'colMd',
                hidden: {
                    xs: true,
                    sm: true,
                    md: false,
                }
            },
            {
                title: 'Column Lg',
                field: 'colLg',
                hidden: {
                    xs: true,
                    sm: true,
                    md: true,
                    lg: false,
                }
            },
            {
                title: 'Column Xl',
                field: 'colXl',
                hidden: {
                    xs: true,
                    sm: true,
                    md: true,
                    lg: true,
                    xl: false
                }
            },
        ];

        return (
            <div className="example lightmode">
                <DuxTable name="hiddencols"
                          data={this.rows}
                          columns={cols}
                          rowKey="index"
                          striped={true}
                />
            </div>
        );
    }
}
