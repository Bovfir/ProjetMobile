import axios from 'axios';
//import Constants from 'expo-constants';

const { VITE_URL_API, VITE_TOKEN } = {
    VITE_URL_API: "http://10.101.40.27:3001/",
    VITE_TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwic3RhdHVzIjoiYWRtaW4iLCJpYXQiOjE3MzQwMTAwNjQsImV4cCI6MTczNDAzODg2NH0.JHEZ3XHNMaJUa0wURmRfb7lcp6UEOQFqa7rbrmuQZos"
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
    const rep = await axios.get(VITE_URL_API + "event/" + eventID + "/discussions/", {
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