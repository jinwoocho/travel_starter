import React, { Component } from 'react';
import { connect } from 'react-redux';
import data from '../data';

class BuildPage extends Component {
    list() {
        return data.recommendations.map((place, index) => {
            return(
                <div className="card" key={index}>
                    <div className="card-header"><h4>{place.name}</h4></div>
                <div className="card-block">
                    <h6 className="card-subtitle mb-2 text-muted">Address</h6>
                    <p className="card-text">{place.snippet}</p>
                    <button className="btn btn-danger">Remove</button>
                </div>
                </div>
            )
        })
    }

    render() {
        console.log(data);
        return(
            <div>
                <h2 className="text-center">Added Items</h2>
                <div>
                    {this.list()}
                </div>
            </div>
        )
    }
}

export default connect(null)(BuildPage);