import axios from 'axios';
//import Constants from 'expo-constants';

const { VITE_URL_API, VITE_TOKEN } = {
    VITE_URL_API: "http://172.1.0.66:3001/",
    VITE_TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwic3RhdHVzIjoiYWRtaW4iLCJpYXQiOjE3MzMyMTQ4ODIsImV4cCI6MTczMzI0MzY4Mn0.B2DdLRcJMwM96xxnz-Eko6ky6GhEkeyoXGPLiHjl7pY"
};

export const getCurrentUser = async () => {
    const rep = await axios.get(VITE_URL_API + "user/me", {
        headers: {
            Authorization: `Bearer ${VITE_TOKEN}`,
        }
    });
    return rep.data;
};

export const getDiscussionsFromEventID = async (eventID) => {
    const rep = await axios.get(VITE_URL_API + "eventManagement/discussionEvent/" + eventID, {
        headers: {
            Authorization: `Bearer ${VITE_TOKEN}`,
        }
    });
    return rep.data;
};

export const getDiscussionsMessages = async (discussionID, offset) => {
    const rep = await axios.get(VITE_URL_API + "discussionEvent/" + discussionID + "/messages/" + offset, {
        headers: {
            Authorization: `Bearer ${VITE_TOKEN}`,
        }
    });
    return rep.data;
};

export const getOlderMessages = async (discussionID, previousMessageID) => {
    const rep = await axios.get(VITE_URL_API + "discussionEvent/" + discussionID + "/olderMessages/" + previousMessageID, {
        headers: {
            Authorization: `Bearer ${VITE_TOKEN}`,
        }
    });
    return rep.data;
}

export const getNewerMessages = async (discussionID, previousMessageID) => {
    const rep = await axios.get(VITE_URL_API + "discussionEvent/" + discussionID + "/newerMessages/" + previousMessageID, {
        headers: {
            Authorization: `Bearer ${VITE_TOKEN}`,
        }
    });
    return rep.data;
};

export const postMessage = async (message) => {
    const rep = await axios.post(VITE_URL_API + "message/", message, {
        headers: {
            Authorization: `Bearer ${VITE_TOKEN}`,
        }
    });
    return rep.data;
}