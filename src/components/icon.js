import React from 'react';

export default (props) => {
    return (
        <i className="material-icons menu-icon" onClick={() => props.handleClick()}>menu</i>
    )
}