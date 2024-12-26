import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { removeNullValues } from './utils';

const perPage = 5;
const perPageNotif = 7;

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
        const response = await axios.get(`${URL}/event/nbEvents/search?page=${page}&perPage=${perPage}`,{
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        return response.data
    }catch(error){
        console.log(error.message);
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
        if(error.status === 404){
            return "Bad Info"
        }else if (error.status === 401){
            return "JWT Expired"
        }else{
            return "Internal error! Please, try later"
        }
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
        return response.data.nbRows
    }catch(error){
        console.log(error);
    }
}
export const getDataByCategories =async(page,categories) =>{
    try{
        const response = await axios.get(`${URL}/search/event/byCategory`,{
            params:{
                page: page,
                perPage: perPage,
                categories: categories.join(',')
            }
        })
        return response.data.response
    }catch(error){
        console.log(error);
    }
}

export const getDataBySearchAndCategories = async(page,categories, search)=>{
    try{
        const params = {
            page: page,
            perPage: perPage,
            search: search,
        }

        if (categories.length > 0){
            params.categories = categories.join(',')
        }

        const response = await axios.get(`${URL}/search/events/searchAllFilter`,{
            params: params,
        })
        return response.data
    }catch(error){
        console.log(error.response.data)
    }
}

export const getInvitation = async(page)=>{
    try{
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
    }catch(error){
        console.log(error.response.data);
    }
}

export const getNotification = async(page)=>{
    try{
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
    }catch(error){
        console.log(error.response.data);
    }
}

export const  getURI = async(imgEvent) =>{
    const uri =`${URL}/${imgEvent}`
    return uri
}

export const declineInvitation = async(id)=>{
    try{
        const token = await getToken();
        const response = await axios.patch(`${URL}/linkUserEvent/invitation/decline/`,{id},{
            headers:{
                'Authorization': `Bearer ${token}`,
            },
        })
    }catch(error){
        console.log(error.response.data)
    }
}

export const acceptInvitation = async(id)=>{
    try{
        const token = await getToken();
        const response = await axios.patch(`${URL}/linkUserEvent/invitation/accept/`,{id},{
            headers:{
                'Authorization': `Bearer ${token}`,
            },
        })
    }catch(error){
        console.log(error.response.data)
    }
}

export const deleteAccount = async()=>{
    try{
        const token = await getToken();
        console.log(token)
        const response =await axios.delete(`${URL}/user/delete/currentUser/`,{
            headers:{
                'Authorization': `Bearer ${token}`,
            },
        })
        console.log(response)
    }catch(error){
        console.log(error.response)
    }
}