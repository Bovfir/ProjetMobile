import axios from 'axios';
import {URL} from "./APIUrl";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { removeNullValues } from '../utils/utils';

const perPageNotif = 7;
const perPage = 5;

export const getToken = async()=>{
    try {
        const token = await AsyncStorage.getItem('jwtToken');
        return token
    } catch (error) {
        throw error;
    }
};   

export const login = async (data) => {
    try {
        const response = await axios.post(`${URL}/user/login` , data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
        await AsyncStorage.setItem('jwtToken',response.data)
        return "ok";
    }catch (error) {
        throw {message : error.response.data, status: error.response.status};
    }
};

export const getInfoUser = async()=>{
    try {
        const token = await getToken();
        const response = await axios.get(`${URL}/user/me`,{
            headers:{
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw {message : error.response.data, status: error.response.status};
    }
};

export const createUser = async(user) => {
    try {
        await axios.post(URL+'/user/registration', user, {
            headers: {
                'Content-Type': 'application/json',
              },
        });
    } catch (error) {
        throw {message : error.response.data, status: error.response.status};
    }
};

export const patchUser = async(values)=>{
    try {
        const token = await getToken();
        const userInfo = removeNullValues(values);
        await axios.patch(`${URL}/user/me`,userInfo,{
            headers:{
                'Authorization': `Bearer ${token}`,
            },
        });
    } catch (error) {
        throw {message : error.response.data, status: error.response.status};
    }
};

export const deleteAccount = async()=>{
    try {
        const token = await getToken();
        await axios.delete(`${URL}/user/delete/currentUser/`,{
            headers:{
                'Authorization': `Bearer ${token}`,
            },
        })
    } catch (error) {
        throw {message : error.response.data, status: error.response.status};
    }
};

export const getNbEventUser = async()=>{
    try { 
        const token = await getToken();
        const response = await axios.get(`${URL}/linkUserEvent/nbLinkUserEvent/byUser/`,{
            headers:{
                'Authorization': `Bearer ${token}`,
            },
        })
        return response.data.response
    } catch (error) {
        throw {message : error.response.data, status: error.response.status};
    }
};

export const getNbEventCreated = async()=>{
    try {
        const token = await getToken();
        const response = await axios.get(`${URL}/search/nbRows/byOwner/`,{
            headers:{
                'Authorization': `Bearer ${token}`,
            },
        })
        return response.data.nbRows
    } catch (error) {
        throw {message : error.response.data, status: error.response.status};
    }
};

export const declineInvitation = async(event_id)=>{
    try {
        const token = await getToken();
        await axios.patch(`${URL}/linkUserEvent/invitation/decline/`,{event_id},{
            headers:{
                'Authorization': `Bearer ${token}`,
            },
        })
    } catch (error) {
        throw {message : error.response.data, status: error.response.status};
    }
};

export const acceptInvitation = async(event_id)=>{
    try {
        const token = await getToken();
        await axios.patch(`${URL}/linkUserEvent/invitation/accept/`,{event_id},{
            headers:{
                'Authorization': `Bearer ${token}`,
            },
        })
    } catch (error) {
        throw {message : error.response.data, status: error.response.status};
    }
};

export const getInvitation = async(page)=>{
    try {
        const token = await getToken();
        const response = await axios.get(`${URL}/linkUserEvent/get/invitation`,{
            headers:{
                'Authorization': `Bearer ${token}`,
            },
            params:{
                page : page,
                perPage : perPageNotif,
            }
        })
        return response.data;
    } catch (error) {
        throw {message : error.response.data, status: error.response.status};
    }
};

export const getNotification = async(page)=>{
    try {
        const token = await getToken();
        const response = await axios.get(`${URL}/notification/get/currentUser`,{
            headers:{
                'Authorization': `Bearer ${token}`,
            },
            params:{
                page : page,
                perPage : perPageNotif,
            }
        })
        return response.data;
    } catch (error) {
        throw {message : error.response.data, status: error.response.status};
    }
};

export const getDataBySearchAndCategories = async(page,categories, search)=>{
    try {
        const token = await getToken();
        const params = {
            page: page,
            perPage: perPage,
            search: search,
        }

        if (categories.length > 0){
            params.categories = categories.join(',')
        }

        const response = await axios.get(`${URL}/search/events/searchAllFilter`,{
            headers:{
                'Authorization': `Bearer ${token}`,
            },
            params: params
        })
        return response.data
    } catch (error) {
        throw {message : error.response.data, status: error.response.status};
    }
};

export const searchEventAllFilterFollowedEvent = async (page, search) => {
    try {
        const token = await getToken();
        const params = {
            page: page,
            perPage: perPage,
            search: search,
        }
        const response = await axios.get(`${URL}/search/events/searchAllFilter/followEvent`,{
            headers:{
                'Authorization': `Bearer ${token}`,
            },
            params: params
        })
        return response.data
    } catch (error) {
        throw {message : error.response.data, status: error.response.status};
    }
}

export const searchEventAllFilterCreatedEvent = async (page, search) => {
    try {
        const token = await getToken();
        const params = {
            page: page,
            perPage: perPage,
            search: search,
        }
        const response = await axios.get(`${URL}/search/events/searchAllFilter/ownEvent`,{
            headers:{
                'Authorization': `Bearer ${token}`,
            },
            params: params
        })
        return response.data
    } catch (error) {
        throw {message : error.response.data, status: error.response.status};
    }
}

export const getAllCategories = async () => {
    try {
        const categoriesList = await axios.get(`${URL}/category/get/allTitle`);
        return categoriesList.data;
    } catch (error){
        throw {message : error.response.data, status: error.response.status}; 
    }
};

export const addEvent = async (eventData) => {
    try {
        const token = await getToken();
        const response = await axios.post(`${URL}/event/oneself/`,eventData, {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw {message : error.response.data, status: error.response.status}; 
    }
};

export const updateEvent = async (eventData) => {
    try {
        const token = await getToken();
        const response = await axios.patch(`${URL}/event/oneself/`,eventData,{
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw {message : error.response.data, status: error.response.status}; 
    }
}

export const deleteEvent = async(id) => {
    try {
        const token = await getToken();
        await axios.delete(`${URL}/event/${id}`,{
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        });
    } catch (error) {
        throw {message : error.response.data, status: error.response.status}; 
    }
};

export const uploadImage = async ({imageUri}) => {
    const formData = new FormData();

    formData.append('image', {
        uri: imageUri,
        name: 'event_image.jpg',  
        type: 'image/jpeg',       
    });

    try {
        const response = await axios.post(`${URL}/uploadImage`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',  
            },
        });
        return response.data.imagePath;
    } catch (error) {
        throw {message : error.response.data, status: error.response.status};
    }
};

export const searchLinkUserEvents = async (page) => {
    try {
        const token = await getToken();
        const response = await axios.get(`${URL}/linkuserevent/search/all/?page=${page}&perPage=${perPage}`, {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw {message : error.response.data, status: error.response.status};
    }
}

export const setFavorite = async (data) => {
    try {
        const token = await getToken();
        axios.patch(`${URL}/linkuserevent/setFavorite/`, data, {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        });
    } catch (error){
        throw {message : error.response.data, status: error.response.status};
    }
};

export const getFavorite = async (page) => {
    try {
        const token = await getToken();
        const response = await axios.get(`${URL}/linkuserevent/favorite/event/?page=${page}&perPage=${perPage}`, {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw {message : error.response.data, status: error.response.status};
    }
}

export const getEventCreatedOfUser = async () => {
    try {
        const token = await getToken();
        const size = 5;
        const page = 1;

        const eventsAPIResponse  = await axios.get(`${URL}/event/created?page=${page}&perPage=${size}`, {
            headers: {
            'Authorization' : `Bearer ${token}`
            }
        });

        return eventsAPIResponse.data;
    } catch (error) {
        throw {message : error.response.data, status: error.response.status}; 
    }
};

export const getEventSubcribedOfUser = async() => {
    try {
        const token = await getToken();
        const size = 5;
        const page = 1;

        const eventsAPIResponse  = await axios.get(`${URL}/event/subscribed?page=${page}&perPage=${size}`, {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        });

        return eventsAPIResponse.data;
    } catch (error) {
        throw {message : error.response.data, status: error.response.status}; 
    }
};

export const getNbEvents = async (page) => {
    try {
        const token = await getToken();
        const eventsAPIResponse = await axios.get(`${URL}/event/nbEvents/search?page=${page}&perPage=${perPage}`, {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        });
        return eventsAPIResponse.data;
    } catch (error) {
        throw {message : error.response.data, status: error.response.status}; 
    }
};


export const ratioEvent = async (eventID) => {
    try {
        const token = await getToken();
        const response = await axios.get(`${URL}/linkUserEvent/ratio/favorite/${eventID}`, {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        });
        return response.data.response;
    } catch (error) {
        throw {message : error.response.data, status: error.response.status};
    }
}

export const checkEmails = async (emails) => {
    try {
        const token = await getToken();
        const response = await axios.post(`${URL}/user/checkEmail/`, emails , {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw {message : error.response.data, status: error.response.status};
    }
};


export const createInvitation = async (data) => {
    try {
        const token = await getToken();
        await axios.post(`${URL}/linkUserEvent/create/invitation/`, data, {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        });
    } catch (error) {
        throw {message : error.response.data, status: error.response.status};
    }
};

export const checkInvitation = async (data) => {
    try {
        const token = await getToken();
        const response = await axios.post(`${URL}/linkUserEvent/check/Invitation/exist/`,data,{
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        });  
        return response.data;
    } catch (error) {
        throw {message : error.response.data, status: error.response.status};
    }
};

export const getCurrentUser = async () => {
    try {
        const token = await getToken();
        const response = await axios.get(`${URL}/user/me/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        return response.data;
    } catch (error) {
        throw {message : error.response.data, status: error.response.status};
    }
};

export const getDiscussionsFromEventID = async (eventID) => {
    try {
        const token = await getToken();
        const reponse = await axios.get(`${URL}/event/${eventID}/discussions/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        return reponse.data;
    } catch (error) {
        throw {message : error.response.data, status: error.response.status};
    }
};

export const createDiscussion = async (data) => {
    try {
        const token = await getToken();
        await axios.post(`${URL}/discussionEvent/new/discussion/`, data,{
            headers: {
                Authorization: `Bearer ${token}`,
            }  
        });
    } catch (error) {
        throw {message : error.response.data, status: error.response.status};
    }
}

export const getDiscussionsMessages = async (discussionID, offset) => {
    try {
        const token = await getToken();
        const reponse = await axios.get(`${URL}/discussionEvent/${discussionID}/messages/${offset}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return reponse.data;
    } catch (error) {
        throw {message : error.response.data, status: error.response.status};
    }
};

export const getOlderMessages = async (discussionID, previousMessageID) => {
    try {
        const token = await getToken();
        const response = await axios.get(`${URL}/discussionEvent/${discussionID}/olderMessages/${previousMessageID}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        throw {message : error.response.data, status: error.response.status};
    }
};

export const getNewerMessages = async (discussionID, previousMessageID) => {
    try {
        const token = await getToken();
        const rep = await axios.get(`${URL}/discussionEvent/${discussionID}/newerMessages/${previousMessageID}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return rep.data;
    } catch (error){
        throw {message : error.response.data, status: error.response.status};
    }
};

export const getEvent = async (eventID) => {
    try {
        const token = await getToken();
        const response = await axios.get(`${URL}/event/id/${eventID}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch(error) {
        throw {message : error.response.data, status: error.response.status};
    }
};

export const getUser = async (id) => {
    try {
        const token = await getToken();
        const response = await axios.get(`${URL}/event/owner/username/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error){
        throw {message : error.response.data, status: error.response.status};
    }
};

export const getLocation = async (locationID) => {
    try {
        const token = await getToken();
        const response = await axios.get(`${URL}/location/${locationID}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch(error) {
        throw {message : error.response.data, status: error.response.status};
    }
};

export const getCategory = async (categoryID) => {
    try {
        const token = await getToken();
        const response = await axios.get(`${URL}/category/${categoryID}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch(error){
        throw {message : error.response.data, status: error.response.status};
    }
};

export const getNbSubscribers = async (eventID) => {
    try {
        const token = await getToken();
        const response = await axios.get(`${URL}/event/nbSubscribers/${eventID}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch(error) {
        throw {message : error.response.data, status: error.response.status};
    }
};

export const postMessage = async (message) => {
    try {
        const token = await getToken();
        const response = await axios.post(`${URL}/message/`, message, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error){
        throw {message : error.response.data, status: error.response.status};
    }
};

export const followEvent = async(event_id) => {
    try {
        const token = await getToken();
        const response = await axios.post(`${URL}/linkUserEvent/follow/event/`,{event_id},{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        throw {message : error.response.data, status: error.response.status};
    }
};

export const unFollowEvent = async(event_id) => {
    try {
        const token = await getToken();
        const response = await axios.delete(`${URL}/linkUserEvent/unfollow/event/${event_id}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        throw {message : error.response.data, status: error.response.status};
    }
};

export const eventAccepted = async (event_id) => {
    try {
        const token = await getToken();
        const response = await axios.get(`${URL}/linkUserEvent/follow/accepted/${event_id}`,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        throw {message : error.response.data, status: error.response.status};
    }
};
