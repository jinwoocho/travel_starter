'use strict';

import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import { connect } from 'react-redux';
import { facebookSignin } from '../actions';

class Facebook extends Component {
    
    responseFacebook(response) {
        console.log(response);
        this.props.facebookSignin(response);
    }

    render() {
        return (
            <FacebookLogin 
                appId='1460312270674459'
                autoLoad = {true}
                version = 'v2.8'
                fields='first_name,last_name,email,gender,age_range,picture'
                scope="public_profile,email"
                callback={(resp => this.responseFacebook(resp))}
            />
        )
    }
}

export default connect(null, { facebookSignin })(Facebook);