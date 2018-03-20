import React from 'react';
import { citySelect } from './city_fxns';
import Test from './imgs/map.jpg';

const City = (props) => {
    return (
        <div className={`jumbotron jumbotron-fluid city-img ${props.className}`}>
            <div className="jumbo-content">
                <div className="profile-lead">{`${citySelect(props.name)}`}</div>
            </div>
        </div>
    )
} 

export default City;