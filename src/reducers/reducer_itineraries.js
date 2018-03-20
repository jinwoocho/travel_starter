import actions from '../actions/types';


const DEFAULT_STATE = {all:[], active:null};

export default function(state = DEFAULT_STATE, action) {
    switch(action.type){
        case 'FETCH_ITINERARIES':
            console.log('itinerary reducer:', action.payload);
            return{...state, all: action.payload.data.data};
        case 'ITINERARY_SELECTED':
            console.log('Selected active:', action.payload);
            return {...state, active: action.payload.data.data};
        case 'CLOSE_ITINERARY':
            return {...state, active: null};
        default:
            return state;
    }
}


