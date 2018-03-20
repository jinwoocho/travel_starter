import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Link,
} from 'react-router-dom';
import CitySelect from './city_selector';
import { citySelect } from './city_fxns';
import { clearPlaces } from '../actions';
import Footer from './footer';

class BuildSearchCitySelect extends Component {
    componentDidMount() {
        this.props.clearPlaces();
    }

    render() {
        return(
            <div className="select-container">
                <h2 className="header-text text-center"><i className="material-icons">place</i>City Navigator</h2>
                    <Link to="/buildsearch/search/Los_Angeles"><CitySelect name="Los Angeles" className="la"/></Link>
                    <Link to="/buildsearch/search/Madrid"><CitySelect name="Madrid" className="mad"/></Link>
                <Footer />
            </div>
        )
    }
}

export default connect(null, { clearPlaces })(BuildSearchCitySelect);