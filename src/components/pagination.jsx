import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const Pagination = (props) => {
    const {itemsCount,pageSize, onPageChange , currentPage} = props;
    const pagesCount = Math.ceil(itemsCount / pageSize);
    const pages = _.range(1,pagesCount + 1); 
    //console.log(currentPage);
    if(pages.length==1){
        return null;
    }
    return ( 
   
    <nav>
        <ul className="pagination">
            {pages.map(page => (
            <li key={page} className={currentPage === page ? 'page-item active' : 'page-item'}>
                <a  className="page-link" onClick={() => onPageChange(page)}>{page}</a>
            </li>))}
        </ul>
    </nav> );
}

export default Pagination;