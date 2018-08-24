import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faSortUp from '@fortawesome/fontawesome-free-solid/faSortUp';
import faSortDown from '@fortawesome/fontawesome-free-solid/faSortDown';
import { isInsideRect } from './helpers';

export class DuxTableHeaderCell extends React.Component {
    constructor(props) {
        super(props);

        this.resizer = null;
        this.resizing = false;
    }

    componentDidMount() {
        window.addEventListener('mousedown', this.onMouseDown, false);
        window.addEventListener('mousemove', this.onMouseMove, false);
        window.addEventListener('mouseup', this.onMouseUp, false);
    }

    onMouseDown = event => {
        let x, y;

        if (event.pageX || event.pageY) {
            x = event.pageX;
            y = event.pageY;
        } else {
            x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }

        if (this.resizer) {
            const resizerRect = this.resizer.getBoundingClientRect();
            if (isInsideRect(x, y, resizerRect.left, resizerRect.top, resizerRect.width, resizerRect.height)) {
                this.resizing = true;
                this.props.mouseDown(event, this.props.columnIndex);
            }
        }
    };

    onMouseMove = event => {
        if (this.resizing) {
            this.props.mouseMove(event, this.props.columnIndex);
        }
    };

    onMouseUp = event => {
        if (this.resizing) {
            this.resizing = false;
            this.props.mouseUp(event, this.props.columnIndex);
        }
    };

    render() {
        const sortable = this.props.column.hasOwnProperty('sortable') ? this.props.column.sortable : true;
        return (
            <div key={this.props.column.title} className="duxtable-td duxtable-th" style={{width: this.props.columnWidths[this.props.columnIndex], cursor: sortable ? 'pointer' : 'default'}}>
                <div onClick={e => this.props.columnClicked(e,this.props.columnIndex)}>
                    {this.props.column.title}{this.props.sortColumn === this.props.columnIndex && <FontAwesomeIcon icon={this.props.sortAscending ? faSortUp : faSortDown} className="duxtable-sort-icon"/>}
                </div>
                {!this.props.isLastColumn &&
                <div ref={r => this.resizer = r} className="duxtable-resizer">

                </div>
                }
            </div>
        );
    }
}

DuxTableHeaderCell.propTypes = {
    column: PropTypes.object.isRequired,
    columnClicked: PropTypes.func.isRequired,
    columnIndex: PropTypes.number.isRequired,
    columnWidths: PropTypes.array.isRequired,
    isLastColumn: PropTypes.bool.isRequired,
    mouseDown: PropTypes.func.isRequired,
    mouseMove: PropTypes.func.isRequired,
    mouseUp: PropTypes.func.isRequired,
    sortAscending: PropTypes.bool.isRequired,
    sortColumn: PropTypes.number.isRequired
};
