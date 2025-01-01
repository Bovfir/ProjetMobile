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
        if(error.status === 404){
            return "Bad Info"
        }else{
            return "Internal error! Please, try later"
        }
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
        if(error.status === 404){
            return "Bad Info"
        }else if (error.status === 401){
            return "JWT Expired"
        }else{
            return "Internal error! Please, try later"
        }
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
        console.log(error)
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
        console.log(error);
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
        console.log(error);
    }
};

export const declineInvitation = async(event_id)=>{
    try {
        const token = await getToken();
        const response = await axios.patch(`${URL}/linkUserEvent/invitation/decline/`,{event_id},{
            headers:{
                'Authorization': `Bearer ${token}`,
            },
        })
    } catch (error) {
        console.log(error.response.data)
    }
};

export const acceptInvitation = async(event_id)=>{
    try {
        const token = await getToken();
        const response = await axios.patch(`${URL}/linkUserEvent/invitation/accept/`,{event_id},{
            headers:{
                'Authorization': `Bearer ${token}`,
            },
        })
    } catch (error) {
        console.log(error.response.data)
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
        console.log(error.response.data);
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
        console.log(error.response.data);
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
        console.log(error)
    }
};

export const searchEvent = async({search, page})=>{
    try {
        const token = await getToken();
        const searchEncoded = new URLSearchParams();
        searchEncoded.set('search',search);
        searchEncoded.set('page', page);
        searchEncoded.set('perPage',perPage);
        const response = await axios.get(`${URL}/search/events/search?${searchEncoded.toString()}`,{
            headers:{
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data.response
    } catch (error) {
        console.log(error);
    }
};
export const getDataByCategories =async(page,categories) =>{
    try {
        const response = await axios.get(`${URL}/search/event/byCategory`,{
            params:{
                page: page,
                perPage: perPage,
                categories: categories.join(',')
            }
        })
        return response.data.response
    } catch (error) {
        console.log(error);
    }
};

const getAllCategories = async () => {
    try {
        const categoriesList = await axios.get(`${URL}/category/get/allTitle`);
        return categoriesList.data;
    } catch (error){
        console.log("Erreur : ", error);
    }
};

const addEvent = async (eventData) => {
    try {
        const token = await getToken();
        const response = await axios.post(`${URL}/event/oneself/`,eventData, {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
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
        console.log(error);
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
        console.log(error);
    }
};

const uploadImage = async ({imageUri}) => {
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
        throw error;
    }
};

const getEventCreatedOfUser = async () => {
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
        console.log(error);
    }
};

const getEventSubcribedOfUser = async() => {
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
        console.log(error);
    }
};

const getNbEvents = async (page) => {
    try {
        const token = await getToken();
        const eventsAPIResponse = await axios.get(`${URL}/event/nbEvents/search?page=${page}&perPage=${perPage}`, {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        });
        return eventsAPIResponse.data;
    } catch (error) {
      console.error("Error fetching events:", error);
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
        throw new Error('Unable to fetch ratioEvent.');
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
        throw error;
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
        throw error;
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
        throw error;
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
        console.error("Error fetching current user:", error.message);
        throw new Error("Unable to fetch current user."); 
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
        throw new Error('Unable to fetch discussions from even.');
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
        throw error;
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
        throw new Error('Unable to fetch messages in discussions.');
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
        throw new Error('Unable to fetch older messages.');
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
        throw new Error('Unable to fetch newer messages.');
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
        throw new Error('Unable to fetch event.');
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
        throw new Error('Unable to fetch user.');
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
        throw new Error('Unable to fetch location.');
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
        throw new Error('Unable to fetch category.');
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
        throw new Error('Unable to fetch nbSubscribers.');
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
        console.log(error)
        throw new Error('Unable to post message.');
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
        throw new Error('Unable to follow event.');
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
        throw new Error('Unable to unfollow event.');
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
        throw new Error('Unable to get eventAccepted.');
    }
};


  

export {
    getAllCategories,
    addEvent,
    uploadImage, 
    getEventCreatedOfUser,
    getEventSubcribedOfUser,
    getNbEvents,
};

