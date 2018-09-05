import React from 'react';
import { connect } from 'react-redux';
import { DuxTable } from '../../src/DuxTable';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { agate } from 'react-syntax-highlighter/styles/hljs';

const mapProps = state => {
    return {
        singleState: state.duxtable.hasOwnProperty('singleselect') ?
            JSON.stringify(state.duxtable.singleselect, null, 3) : '{}',
        multiState: state.duxtable.hasOwnProperty('multiselect') ?
            JSON.stringify(state.duxtable.multiselect, null, 3) : '{}'
    };
};

class SelectionsUi extends React.Component {
    constructor(props) {
        super(props);

        this.states = [
            {label:'Alabama', value:'AL'},
            {label:'Alaska', value:'AK'},
            {label:'Arizona', value:'AZ'},
            {label:'Arkansas', value:'AR'},
            {label:'California', value:'CA'},
            {label:'Colorado', value:'CO'},
            {label:'Connecticut', value:'CT'},
            {label:'Delaware', value:'DE'},
            {label:'Florida', value:'FL'},
            {label:'Georgia', value:'GA'},
            {label:'Hawaii', value:'HI'},
            {label:'Idaho', value:'ID'},
            {label:'Illinois', value:'IL'},
            {label:'Indiana', value:'IN'},
            {label:'Iowa', value:'IA'},
            {label:'Kansas', value:'KS'},
            {label:'Kentucky', value:'KY'},
            {label:'Louisiana', value:'LA'},
            {label:'Maine', value:'ME'},
            {label:'Maryland', value:'MD'},
            {label:'Massachusetts', value:'MA'},
            {label:'Michigan', value:'MI'},
            {label:'Minnesota', value:'MN'},
            {label:'Mississippi', value:'MS'},
            {label:'Missouri', value:'MO'},
            {label:'Montana', value:'MT'},
            {label:'Nebraska', value:'NE'},
            {label:'Nevada', value:'NV'},
            {label:'New Hampshire', value:'NH'},
            {label:'New Jersey', value:'NJ'},
            {label:'New Mexico', value:'NM'},
            {label:'New York', value:'NY'},
            {label:'North Carolina', value:'NC'},
            {label:'North Dakota', value:'ND'},
            {label:'Ohio', value:'OH'},
            {label:'Oklahoma', value:'OK'},
            {label:'Oregon', value:'OR'},
            {label:'Pennsylvania', value:'PA'},
            {label:'Rhode Island', value:'RI'},
            {label:'South Carolina', value:'SC'},
            {label:'South Dakota', value:'SD'},
            {label:'Tennessee', value:'TN'},
            {label:'Texas', value:'TX'},
            {label:'Utah', value:'UT'},
            {label:'Vermont', value:'VT'},
            {label:'Virginia', value:'VA'},
            {label:'Washington', value:'WA'},
            {label:'West Virginia', value:'WV'},
            {label:'Wisconsin', value:'WI'},
            {label:'Wyoming', value:'WY'}
        ];
    }

    render() {
        const cols = [
            {
                field: 'label',
                title: 'State'
            }
        ];

        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h4>Select Your Favorite State</h4>
                        <div className="example lightmode">
                            <DuxTable name="singleselect"
                                      data={this.states}
                                      pagination={false}
                                      bodyHeight={300}
                                      selectionMode="single"
                                      rowKey="value"
                                      columns={cols}
                            />
                        </div>
                    </div>
                    <div className="col">
                        <h4>Redux State</h4>
                        <SyntaxHighlighter language="JavaScript" style={agate}>
                            {this.props.singleState}
                        </SyntaxHighlighter>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col">
                        <h4>Select States You Have Visited</h4>
                        <div className="example lightmode">
                            <DuxTable name="multiselect"
                                      data={this.states}
                                      pagination={false}
                                      bodyHeight={300}
                                      selectionMode="multi"
                                      rowKey="value"
                                      columns={cols}
                            />
                        </div>
                    </div>
                    <div className="col">
                        <h4>Redux State</h4>
                        <SyntaxHighlighter language="JavaScript" style={agate}>
                            {this.props.multiState}
                        </SyntaxHighlighter>
                    </div>
                </div>
            </div>
        );
    }
}

export const Selections = connect(mapProps)(SelectionsUi);
