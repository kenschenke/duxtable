import React from 'react';
import PropTypes from 'prop-types';
import { mapDuxTableHeaderCellProps, mapDuxTableHeaderCellDispatch } from './maps/DuxTableHeaderCell.map';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faSortUp from '@fortawesome/fontawesome-free-solid/faSortUp';
import faSortDown from '@fortawesome/fontawesome-free-solid/faSortDown';
import { isInsideRect } from './helpers';

class DuxTableHeaderCellUi extends React.Component {
    constructor(props) {
        super(props);

        this.resizer = null;
        this.resizing = false;
        this.dragX = -1;  // x coordinate of last column resize mouse movement
    }

    columnClicked = event => {
        event.preventDefault();

        let sortAscending = this.props.sortAscending;
        if (this.props.columnIndex === this.props.sortColumn) {
            sortAscending = !sortAscending;
        } else {
            sortAscending = true;
        }

        this.props.setSort(this.props.tableProps.name, sortAscending, this.props.columnIndex);
    };

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
                this.dragX = event.screenX;
            }
        }
    };

    onMouseMove = event => {
        if (this.resizing) {
            const xDelta = event.screenX - this.dragX;

            let widths = [...this.props.columnWidths];

            widths[this.props.columnIndex] = this.props.columnWidths[this.props.columnIndex] + xDelta;
            widths[this.props.columnIndex + 1] = this.props.columnWidths[this.props.columnIndex+1] - xDelta;

            this.props.setColumnWidths(this.props.tableProps.name, widths);
            this.dragX = event.screenX;
        }
    };

    onMouseUp = event => {
        if (this.resizing) {
            this.resizing = false;
            this.dragX = -1;
        }
    };

    render() {
        const sortable = this.props.column.hasOwnProperty('sortable') ? this.props.column.sortable : true;
        return (
            <div className="duxtable-td duxtable-th"
                 style={{width: this.props.columnWidths[this.props.columnIndex], cursor: sortable ? 'pointer' : 'default'}}
            >
                <div onClick={e => {if (sortable) this.columnClicked(e)}}>
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

DuxTableHeaderCellUi.propTypes = {
    // Provided by component parent
    tableProps: PropTypes.object.isRequired,
    column: PropTypes.object.isRequired,
    columnIndex: PropTypes.number.isRequired,
    isLastColumn: PropTypes.bool.isRequired,

    // Provided by Redux map
    columnWidths: PropTypes.array.isRequired,
    sortAscending: PropTypes.bool.isRequired,
    sortColumn: PropTypes.number.isRequired,
    setColumnWidths: PropTypes.func.isRequired,
    setSort: PropTypes.func.isRequired,
};

export const DuxTableHeaderCell = connect(mapDuxTableHeaderCellProps, mapDuxTableHeaderCellDispatch)(DuxTableHeaderCellUi);
