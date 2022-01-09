import React, { Component } from 'react';

const ListGroup = (props) => {
    const {items, onGenreSelect, onCurrentGenre} = props
    return ( 
        <ul className="list-group">
            {items.map((itm) => (<li className={onCurrentGenre.name === itm.name ? 'list-group-item active' : 'list-group-item'} key={itm._id} onClick={() => onGenreSelect(itm) }>{itm.name}</li>))}
        </ul>
     );
}
 
export default ListGroup;