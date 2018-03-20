import React, { Component } from 'react';
import {
    Link,
    Route
} from 'react-router-dom';
import Build from './build';
import SavedItineraries from './my_itineraries';
import Discover from './discover';
import Data from '../data';
import SearchIcon from './imgs/search.png';
import Drafts from './imgs/notepad.png';
import Publish from './imgs/heart.png';
import Create from './imgs/pencil.png';
import DraftPage from './draft';



class Home extends Component{
  render() {
      console.log ('Data is:', Data);
        return (
            <div>
                <div className="jumbotron profile-hero">
                <div className="jumbo-content">
                    <div className="profile-lead">Welcome back!</div>
                </div>
            </div>
            
            <div className="row icon-container">
                <div className="col-6 ballicon">
                    <Link to="/buildsearch/cityselect"><img src={Create} alt="Create" className="profile-icons"/><br/>New Itinerary</Link>
                </div>
                <div className="col-6 ballicon">
                    <Link to="/discover"><img src={SearchIcon} alt="Search" className="profile-icons"/><br/>Discover</Link>
                </div>
                <div className="col-6 ballicon">
                    <Link to="/my_itineraries"><img src={Publish} alt="Saved" className="profile-icons"/><br/>My Trips</Link>
                </div>
                <div className="col-6 ballicon">
                    <Link to="/draft"><img src={Drafts} alt="Drafts" className="profile-icons"/><br/>Drafts</Link>
                </div>
            </div>

                <Route path ="./buildsearch/cityselect" component={Build}/>
                <Route path ="./my_itineraries" component={SavedItineraries}/>
                <Route path ="./discover" component={Discover}/>
                <Route path ="./draft" component={DraftPage}/>


            </div>
        )
    }
}

export default Home;

