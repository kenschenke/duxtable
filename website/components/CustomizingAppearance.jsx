import React from 'react';
import { DuxTable } from '../../src/DuxTable';
import {makeAddresses} from "../../address-helpers";
import SyntaxHighlighter from "react-syntax-highlighter";
import {agate} from "react-syntax-highlighter/styles/hljs";

export class CustomizingAppearance extends React.Component {
    constructor(props) {
        super(props);

        this.addrs = makeAddresses();
        this.state = {
            darkMode: false
        };
    }

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
            }
        ];

        const extraCss = `
.lightmode {
    background-color: #fff;
    color: #000;
}

.darkmode .duxtable-th {
    background-color: #bbb;
    border-color: #aaa;
    color: #555;
}

.darkmode .duxtable-pagination-button {
    background-color: #bbb;
    border-color: #bbb;
    color: #555;
}

.darkmode .duxtable-pagination-button:disabled {
    background-color: #777;
    border-color: #777;
}

.darkmode .duxtable-pagination-button:hover:not(:disabled):not(.disabled) {
    background-color: #eee;
    border-color: #eee;
    color: #555;
}
        `;

        return (
            <div>
                <input className="mr-2 mb-3" type="checkbox" onChange={e => this.setState({darkMode: !this.state.darkMode})}/>
                Dark Mode
                <div className={'example ' + (this.state.darkMode ? 'darkmode' : 'lightmode')}>
                    <DuxTable name="basics" columns={cols} data={this.addrs} rowKey="Id" striped={true}/>
                </div>
                <h3 className="mt-3">CSS Style</h3>
                <SyntaxHighlighter language="CSS" style={agate}>
                    {extraCss}
                </SyntaxHighlighter>
            </div>
        );
    }
}
