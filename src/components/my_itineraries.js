import React, {Component} from 'react';
import {connect} from 'react-redux';
import {selectItinerary} from '../actions/index';
import ItineraryDetails from '../containers/itinerary_detail';
import {fetchItineraries} from '../actions/index';


class ItineraryList extends Component {

    componentDidMount(){
        this.props.fetchItineraries();
    }
    renderList(){
        console.log('Render list called');
        console.log('list props.active:', this.props);
        return this.props.itineraries.map((itinerary)=>{
            if(this.props.active && itinerary.itinerary_id === this.props.active[0].itinerary_id ){
                return (
                    <ItineraryDetails key={itinerary.itinerary_id} itinerary={this.props.active}/>
                )
            }
            return(
                <div className="card" style={{width: 20 + 'rem'}} key={itinerary.itinerary_id}>
                    <img className="card-img-top" src={itinerary.image_list} alt="Card image cap"/>
                    <div className="card-block">
                        <h4 className="card-title">{itinerary.city_id}</h4>
                        <p className="card-text">{itinerary.itinerary_name}</p>
                        <a onClick = {()=> this.props.selectItinerary(itinerary)} className="btn btn-primary">select itinerary</a>
                    </div>
                </div>
            );
        });
    }


    render(){
        console.log('Active:', this.props.active);
        if(!this.props.itineraries) {
            return (
                <div className="spinner">
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                </div>
            )
        }
        return(
            <div className="itinerary-container">
                <div>
                    <div className="trip-header">My Trips</div>
                    <div>You have no published trips</div>
                </div>
                <div className="card-grid">
                    {this.renderList()}
                </div>
            </div>
        )
    }
}


function mapStateToProps(state){
    return{
        itineraries: state.itineraries.all,
        active: state.itineraries.active
    }
}




export default connect(mapStateToProps, {fetchItineraries, selectItinerary})(ItineraryList);
