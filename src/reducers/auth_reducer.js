import actions from '../actions/types';

const DEFAULT_STATE = { authorized: false, error: null };

export default function authReducer(state = DEFAULT_STATE, action) {
    switch(action.type) {
        case actions.SIGN_IN:
            console.log('signin success woohoo!');
            return { authorized: true, error: null };
        case actions.ERROR:
            return { ...state, error: action.error }
        default:
            return state;
    }
}