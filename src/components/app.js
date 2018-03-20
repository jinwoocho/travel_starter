import React from 'react';
import {
    Link,
    Route
} from 'react-router-dom';
import './app.css';
import Navbar from './navbar';
import Home from './home';
import BuildSearch from './buildsearch';
import SavedItineraries from './my_itineraries';
import FindItin from './discover';
import BuildSearchCitySelect from './buildsearchcityselect';
import LoginPage from './login_page';
import DraftPage from './draft';


const nav_links = [
    {
        title: 'Home',
        path: '/'
    },
    {
        title: 'Destinations',
        path:'/destinations'
    },
    {
        title: 'Itinerary',
        path: '/my_itineraries'
    },
    {
        title: 'About',
        path: '/about'
    }
];

const App = () => (
    <div>
        <Navbar links={nav_links} brand="travelStarter"/>
        <div>
            <Route exact path="/" component={Home} />
            <Route path='/login' component={LoginPage} />
            <Route path="/buildsearch/cityselect" component={BuildSearchCitySelect} />
            <Route path="/buildsearch/search/:id" component={BuildSearch} />
            <Route path="/buildsearch/build/:id" component={BuildSearch} />
            <Route path="/my_itineraries" component={SavedItineraries}/>
            <Route path="/discover" component={FindItin} />
            <Route path="/draft" component={DraftPage}/>
        </div>
    </div>
);

export default App;
