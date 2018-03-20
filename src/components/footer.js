import React from 'react';
import {
    Link,
    Route
} from 'react-router-dom';
import Home from './home';
import Search from './search';
import Saved from './my_itineraries';
import FindItin from './discover';

const footer = () => {
    return (
        <div id="footer">
            <div className="navbar fixed-bottom navbar-inverse bg-default footer">
                <div className="row" id="bottomNav">
                    <div className="col text-center icons"><Link to="/" className="icon-text"><i className="material-icons">perm_identity</i></Link></div>
                    <div className="col text-center icons"><Link to="/buildsearch/cityselect" className="icon-text"><i className="material-icons">add</i></Link></div>
                    <div className="col text-center icons"><Link to="/my_itineraries" className="icon-text"><i className="material-icons">bookmark_border</i></Link></div>
                </div>
            </div>
        </div>
    )
}

export default footer;