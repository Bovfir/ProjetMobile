import {
    FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORIES_FAILURE,
    CREATE_EVENT_SUCCESS,
    UPDATE_EVENT_SUCCESS,
    DELETE_EVENT_SUCCESS,
} from '../actions/eventActions';


const initialState = {
    categories: [],
    loading: false,
    error: null,
    currentEvent: null,
};

const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CATEGORIES_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_CATEGORIES_SUCCESS:
            return { ...state, loading: false, categories: action.payload };
        case FETCH_CATEGORIES_FAILURE:
            return { ...state, loading: false, error: action.error };
        case CREATE_EVENT_SUCCESS:
            return { ...state, currentEvent: action.payload };
        case UPDATE_EVENT_SUCCESS:
            return { ...state, currentEvent: { ...state.currentEvent, ...action.payload } };
        default:
            return state;
    }
};

export default eventReducer;