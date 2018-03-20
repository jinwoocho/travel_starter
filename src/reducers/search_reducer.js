import actions from '../actions/types';

const DEFAULT_STATE = {
    poi: {},
    page: []
}

export default function(state = DEFAULT_STATE, action) {
    switch(action.type) {
        case actions.FETCH_PLACES:
            return { ...state, poi: action.payload };
        case actions.CLEAR_PLACES:
            return { ...state, poi: {} };
        case actions.CURRENT_PAGE:
            return { ...state, page: action.payload};
        default:
            return state;
    }
}