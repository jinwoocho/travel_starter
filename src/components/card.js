import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPlace } from '../actions';

class Card extends Component {
    handleClick() {
        const place = {
            userId: 1,
            itinId: 1,
            tag_label: this.props.tag_label,
            data: this.props.info
        }
        console.log(place);
        this.props.addPlace(place);
    }
    render() {
    return (
        <div>
            <div className="card" style={{width: 20 + 'rem'}}>
                <img className="card-img-top" src={this.props.img} alt="Card image cap"/>
                <div className="card-block">
                    <h4 className="card-title">{this.props.title}</h4>
                    <p className="card-text">{this.props.text}</p>
                    <p className="card-text">{this.props.tags}</p>
                    <button className="btn btn-primary" onClick={() => this.handleClick()}>Add to Itinerary</button>
                </div>
            </div>
        </div>
    )
    }
}

export default connect(null, { addPlace })(Card);