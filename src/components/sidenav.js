import React from 'react';
import { Link } from 'react-router-dom'
import Logo from './imgs/travelstarter_logo.png';

const SideNav = (props) => {
    return (
        <div className={props.className} >
            <img className="img-fluid sideNav-img"src={Logo} alt="Logo"/>
            <hr />
            <div className="container sideNav-links" onClick={ () => props.closeNav()}>
                <Link to="/">Home</Link>
                <Link to="/buildsearch/cityselect">Destinations</Link>
                <Link to="/my_itineraries">My Trips</Link>
                <Link to="#">About</Link>
            </div>
        </div>
    )
}

export default SideNav;