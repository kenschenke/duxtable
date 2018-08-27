import React from 'react';
import PropTypes from 'prop-types';
import { formatNumber } from './helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faForward from '@fortawesome/fontawesome-free-solid/faForward';
import faBackward from '@fortawesome/fontawesome-free-solid/faBackward';

export const DuxTablePager = props => {
    if (!props.tableProps.pagination) {
        return null;
    }

    return (
        <div className={'duxtable-pagination' + (props.tableProps.fetchingData ? ' duxtable-invisible' : '')}>
            <div className="duxtable-flex-row">
                <div style={{flexBasis: 0, flexGrow: 1, maxWidth: '100%'}}>
                    <button type="button"
                            className="duxtable-pagination-button"
                            disabled={props.currentPage < 2}
                            onClick={() => props.currentPageChanged(props.currentPage - 1)}
                    >
                        <FontAwesomeIcon icon={faBackward} style={{marginTop:-3}}/> Previous
                    </button>
                </div>
                <div className="duxtable-flex-col-8 duxtable-text-center">
                    Page {props.currentPage} of {props.totalPages}
                    { props.numFilteredRows < props.numAllRows &&
                    <span> ({formatNumber(props.numFilteredRows,0)} of {formatNumber(props.numAllRows,0)} records)</span>
                    }
                    { props.numFilteredRows === props.numAllRows &&
                    <span> ({formatNumber(props.numAllRows,0)} records)</span>
                    }
                </div>
                <div className="duxtable-flex-col-grow" style={{textAlign:'right'}}>
                    <button type="button"
                            className="duxtable-pagination-button"
                            disabled={props.currentPage >= props.totalPages}
                            onClick={() => props.currentPageChanged(props.currentPage + 1)}
                    >
                        Next <FontAwesomeIcon icon={faForward} style={{marginTop:-3}}/>
                    </button>
                </div>
            </div>
        </div>
    );
};

DuxTablePager.propTypes = {
    currentPage: PropTypes.number.isRequired,
    currentPageChanged: PropTypes.func.isRequired,
    numAllRows: PropTypes.number.isRequired,
    numFilteredRows: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    tableProps: PropTypes.object.isRequired,
};
