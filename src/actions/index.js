import axios from 'axios';
import actions from './types';

const BASE_URL = 'https://www.triposo.com/api/v2/poi.json?location_id=';
const END_URL = '&count=40&fields=all&tag_labels=';
const ACCOUNT = '2FYB6LGM';
const TOKEN = 'lkuszx1cd7srxliatwfs0dalj0blvyis';
const ROOT_URL = 'http://localhost:8888/travel_final_project/prototypes/phpFileStructureProto/api.php?action=';

const LOGIN_URL = 'http://localhost:8888/travel_final_project/prototypes/facebookLogin/fb_login_data/fb_user_info.php';

const phpCall = axios.create('', {
    headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Origin': 'http://localhost:3000'}
});

export function fetchPlaces(city, query) {
    const request = axios.get(`${BASE_URL}${city}${END_URL}${query}`, {
        params: {
            account: ACCOUNT,
            token: TOKEN
        }
    })

    return{
        type: actions.FETCH_PLACES,
        payload: request
    }
}

export function clearPlaces() {
    return{
        type: actions.CLEAR_PLACES,
        payload: null
    }
}

export function currentPage(arr) {
    return{
        type: actions.CURRENT_PAGE,
        payload: arr
    }
}

export function fetchItineraries() {
    const request = axios.get('http://localhost:8888/C4.17_travelStarter/travel_final_project/prototypes/phpFileStructureProto/api.php?action=readItinerary');
    return {
        type: 'FETCH_ITINERARIES',
        payload: request
    }
}

export function selectItinerary(itinerary, itinID){
    console.log('itinerary in action creator:', itinerary);
    const request = axios.get(`${ROOT_URL}displayItinerary&${itinID}`);
    return {
        type: 'ITINERARY_SELECTED',
        payload: request
    }
}

export function itineraryClose(){
    return{
        type: 'CLOSE_ITINERARY',
        payload: {}
    }
}

export function addPlace(val) {
    const request = axios.post('http://travelstarter.world/prototypes/phpFileStructureProto/api.php?action=createItem', {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: val
    }).then((resp) => console.log(resp));
    return{
        type: actions.ADD_PLACE,
        payload: request
    }
}

export function signUp({email, password}) {
    return (dispatch) => {
        axios.post(`${LOGIN_URL}/signup`, { email, password }).then((resp) => {
            console.log('response from signup:', resp);

            localStorage.setItem('token', resp.data.token)

            dispatch({
                type: action.SIGN_UP,
            })
        }).catch( error => {
            console.log('error', error.response.data.error);
            dispatch(sendError(error.response.data.error));
        });
    }    
}

export function signIn({ email, password }) {
    return (dispatch) => {
        axios.post(`${LOGIN_URL}/signin`, { email, password}).then((resp) => {
            console.log('response from signin:', resp);

            localStorage.setItem('token', resp.data.token)

            dispatch({
                type: actions.SIGN_IN,
            })
        }).catch( error => {
                
        })
    }
}

export function facebookSignin(facebookUser) {
    return (dispatch) => {
        axios.post(`${LOGIN_URL}`, facebookUser).then((resp) => {
            console.log('response from signin:', resp);

            localStorage.setItem('token', resp.data.token)

            dispatch({
                type: actions.SIGN_IN,
            })
        }).catch( error => {
                console.log('There was an error:', error);

                dispatch({ type: 'idk'});
        })
    }
}

function sendError(error){
    return {
        type: actions.ERROR,
        error
    }
}

