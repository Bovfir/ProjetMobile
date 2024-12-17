import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { removeNullValues } from './utils';

const perPage = 10;

const URL = 'http://192.168.0.74:3001'

export const getToken = async()=>{
    try{
        const token = await AsyncStorage.getItem('jwtToken');
        if(token){
            return token
        }
        return null
    }catch(error){
        throw error;
    }
}   

export const login = async (data) => {
    try{
        const response = await axios.post(URL + '/user/login' , data, {
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
}

export const createUser = async(user) => {
    try{
        const response = await axios.post(URL+'/user/registration', user, {
            headers: {
                'Content-Type': 'application/json',
              },
        });
    }catch(error){
        console.log(error.message);
    }
}
export const getEvent = async(page)=>{
    try{
        const token = await getToken();
        const response = await axios.get(`${URL}/search/event/all?page=${page}&perPage=${perPage}`,{
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data.events
    }catch(error){
        console.log(error);
    }
    
}
export const getCategories = async()=>{
    try{
        const token = await getToken();
        const response = await axios.get(`${URL}/category/get/allTitle`,{
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    }catch(error){
        console.log(error);
    }
}
export const searchEvent = async({search, page})=>{
    try{
        const token = await getToken();
        const searchEncoded = new URLSearchParams();
        searchEncoded.set('search',search);
        searchEncoded.set('page', page);
        searchEncoded.set('perPage',perPage);
        const urlFinal = `${URL}/events/search?${searchEncoded.toString()}`
        const response = await axios.get(`${URL}/search/events/search?${searchEncoded.toString()}`,{
            headers:{
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data.response
    }catch(error){
        console.log(error);
    }
}
export const getInfoUser = async()=>{
    try{
        const token = await getToken();
        const response = await axios.get(`${URL}/user/me`,{
            headers:{
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    }catch(error){
        console.log(error);
    }
}
export const patchUser = async(values)=>{
    try{
        const token = await getToken();
        const userInfo = removeNullValues(values);
        await axios.patch(`${URL}/user/me`,userInfo,{
            headers:{
                'Authorization': `Bearer ${token}`,
            },
        });
    }catch(error){
        console.log(error);
    }
}
export const getNbEventUser = async()=>{
    try{ 
        const token = await getToken();
        const response = await axios.get(`${URL}/linkUserEvent/nbLinkUserEvent/byUser/`,{
            headers:{
                'Authorization': `Bearer ${token}`,
            },
        })
        return response.data.response
    }catch(error){
        console.log(error);
    }
}
export const getNbEvetnCreated = async()=>{
    try{
        const token = await getToken();
        const response = await axios.get(`${URL}/search/nbRows/byOwner/`,{
            headers:{
                'Authorization': `Bearer ${token}`,
            },
        })
        console.log(response.data)
    }catch(error){
        console.log(error);
    }
}