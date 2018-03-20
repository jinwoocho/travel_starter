import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Icon from './icon';
import SideNav from './sidenav';


class Navbar extends Component {
    constructor(props) {
        super(props);

        this.linkElements = this.props.links.map((link, index) => {
            return <li key={index} className="nav-item"><Link to={link.path} className="nav-link">{link.title}</Link></li>
        });

        this.state = {
            shiftIn : false
        }
    }

    toggleNav() {
        console.log('burger clicked');
        this.setState({
            shiftIn: !this.state.shiftIn
        });
    }

    render() {  
        let className = this.state.shiftIn ? 'hidden-sideNav visible' : 'hidden-sideNav';
        return (
            <div className="nav-container">
                <nav className="navbar fixed-top navbar-toggleable-md navbar-inverse bg-default">
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <Icon handleClick={() => this.toggleNav()}/>
                    </button>
                    <Link to="/" className="navbar-brand">{this.props.brand}</Link>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            {this.linkElements}
                        </ul>
                    </div>
                    <SideNav className={className} closeNav={() => this.toggleNav()}/>
                </nav>
            </div>
        )
    }
}

export default Navbar;

//<li key={index} className="nav-item"><a href={link.path} className="nav-link">{link.title}</a></li>