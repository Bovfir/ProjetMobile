import {
    getAllCategories as APIGetCategories,
    addEvent as APIAddEvent,
    updateEvent as APIUpdateEvent,
    checkEmails,
    createInvitation,
} from '../API/index'
import { showToast } from '../utils/utils';

export const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';

export const CREATE_EVENT_SUCCESS = 'CREATE_EVENT_SUCCESS';
export const UPDATE_EVENT_SUCCESS = 'UPDATE_EVENT_SUCCESS';


export const fetchCategories = () => async(dispatch) => {
    dispatch({ type: FETCH_CATEGORIES_REQUEST });
    try {
        const categories = await APIGetCategories();
        dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: categories });
    } catch (error) {
        showToast('error', 'Recovery error', 'An error occurred while retrieving categories. Please try later.');
        dispatch({ type: FETCH_CATEGORIES_FAILURE, error });
    }
}

export const createEvent = (eventData, emailList) => async (dispatch) => {
    try {
        let response ;
        if (emailList?.length) {
            response = await checkEmails({ emails: emailList });
        }

        const createdEvent = await APIAddEvent(eventData);
        dispatch({ type: CREATE_EVENT_SUCCESS, payload: createdEvent });

        if(response){
            await createInvitation({ ids: response.idEmailExist, event_id: createdEvent.id });
        }
        
    } catch (error) {
        showToast('error', 'Creation error', 'An error occurred while creating the event. Please try later.');
    }
};

export const updateEvent = (eventData,emailList) => async (dispatch) => {
    try {
        let response ;
        if (emailList?.length) {
            response = await checkEmails({ emails: emailList });
        }

        const updateEvent = await APIUpdateEvent(eventData);
        dispatch({ type: UPDATE_EVENT_SUCCESS, payload: updateEvent });

        if(response){
            await createInvitation({ ids: response.idEmailExist, event_id: updateEvent.id });
        }

    } catch (error) {
        showToast('error', 'Update error', 'An error occurred while updating the event. Please try later.');
    }
};