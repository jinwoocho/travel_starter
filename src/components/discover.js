import React from 'react';
import Mask from './maskImg';
import ItineraryList from '../containers/itinerary_list';
import Footer from './footer';

export default ()=>{
    return(
        <div className="discover-container">
            <Mask header="featured trips" lead="discover your next adventure"/>
            <div>
              <ItineraryList/>
              <Footer />
            </div>
        </div>
    )
}

