import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { itineraryClose } from '../actions/index';

class ItineraryDetail extends Component {
    render() {
        console.log('Active Itinerary:', this.props.itinerary);
        return(
            <div className="card" style={{width: 20 + 'rem'}}>
                <img className="card-img-top" src={this.props.itinerary[0].image_list} alt="Card image cap"/>
                <div className="card-block">
                    <h4 className="card-title">{this.props.itinerary.city_id}</h4>
                    <p className="card-text">{this.props.itinerary.itinerary_name}</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">{this.props.itinerary[0].activity_name}</li>
                    <li className="list-group-item">{this.props.itinerary[1].activity_name}</li>
                    <li className="list-group-item">{this.props.itinerary[2].activity_name}</li>
                </ul>
                <div className="card-block">
                    <a href="#" className="card-link">Card link</a>
                    <a onClick = {()=> this.props.itineraryClose()} type="button" className="close" aria-label="Close"><span aria-hidden="true">&times;</span></a>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        itinerary: state.activeItinerary
    };
}

export default connect(null, {itineraryClose})(ItineraryDetail);