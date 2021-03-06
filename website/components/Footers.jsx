import React from 'react';
import DuxTable from '../../src/DuxTable';

export class Footers extends React.Component {
    constructor(props) {
        super(props);

        this.Languages = [
            {
                Language: 'Javascript',
                Projects: Math.round(Math.random() * 10000)
            },
            {
                Language: 'Python',
                Projects: Math.round(Math.random() * 10000)
            },
            {
                Language: 'Java',
                Projects: Math.round(Math.random() * 10000)
            },
            {
                Language: 'Ruby',
                Projects: Math.round(Math.random() * 10000)
            },
            {
                Language: 'PHP',
                Projects: Math.round(Math.random() * 10000)
            },
            {
                Language: 'C++',
                Projects: Math.round(Math.random() * 10000)
            },
            {
                Language: 'CSS',
                Projects: Math.round(Math.random() * 10000)
            },
            {
                Language: 'C#',
                Projects: Math.round(Math.random() * 10000)
            },
            {
                Language: 'GO',
                Projects: Math.round(Math.random() * 10000)
            },
            {
                Language: 'C',
                Projects: Math.round(Math.random() * 10000)
            },
            {
                Language: 'Typescript',
                Projects: Math.round(Math.random() * 10000)
            },
            {
                Language: 'Shell',
                Projects: Math.round(Math.random() * 10000)
            },
            {
                Language: 'Swift',
                Projects: Math.round(Math.random() * 10000)
            },
            {
                Language: 'Scala',
                Projects: Math.round(Math.random() * 10000)
            },
            {
                Language: 'Objective-C',
                Projects: Math.round(Math.random() * 10000)
            },
        ];
    }

    render() {
        const cols = [
            {
                title: 'Language',
                field: 'Language',
                footer: <strong>Total Projects</strong>
            },
            {
                title: 'Projects',
                field: 'Projects',
                width: 150,
                align: 'right',
                footer: items => {
                    let totalProjects = 0;
                    for (let i = 0; i < items.length; i++) {
                        totalProjects += items[i].Projects;
                    }
                    return <strong>{totalProjects}</strong>;
                }
            }
        ];

        return (
            <div className="example lightmode">
                <DuxTable name="footers"
                          columns={cols}
                          rowKey="Language"
                          data={this.Languages}
                          striped={true}
                          sortColumn={1}
                          sortAscending={false}
                />
            </div>
        );

    }
}
