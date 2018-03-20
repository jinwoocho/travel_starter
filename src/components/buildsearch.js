import React, { Component } from 'react';
import {
    Link,
    Route
} from 'react-router-dom';
import { connect } from 'react-redux';
import Build from './build';
import Search from './search';
import Footer from './footer';

class BuildSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false
        }
        
        this.className = this.state.active ?  'nav-link tab-links' : ' nav-link tab-links selected';

    }
    
    toggleActive() {
        console.warn('build tab clicked');
        this.setState({
            active: !this.state.active
        })
    }

    searchLink() {
        const addressArray = this.props.match.url.split('/');
        if(addressArray[2] === 'build') {
            return(
                <Link className={this.className} to={`/buildsearch/search/${this.props.match.params.id}/${this.props.currentSearchPage[0]}/${this.props.currentSearchPage[1]}`} onClick={() => this.toggleActive()}>Search</Link>
            )
        }
        return(
            <Link className={this.className} to={`/buildsearch/search/${this.props.match.params.id}`} onClick={() => this.toggleActive()}>Search</Link>
        )
    }
    
    render() {
        console.log('buildsearch redux:', this.props.currentSearchPage)
        const addressArray = this.props.match.url.split('/');
        console.log('params', this.props);

        return(
            <div className='buildsearchpage'>
                <ul className="nav nav-tabs build-tabs">
                    <li className='nav-item'>
                        {this.searchLink()}
                    </li>
                    <li className='nav-item'>
                        <Link className={this.className} to={`/buildsearch/build/${this.props.match.params.id}`}>Build</Link>
                    </li>
                </ul>

                <Route path="/buildsearch/build/:id" component={Build}/>
                <Route path="/buildsearch/search/:id" component={Search}/>
                <Footer />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        currentSearchPage: state.currentPage.page
    }
}

export default connect(mapStateToProps)(BuildSearch);

