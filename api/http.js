import axios from 'axios';
//import Constants from 'expo-constants';

const { VITE_URL_API, VITE_TOKEN } = {
    VITE_URL_API: "http://172.1.2.178:3001/",
    VITE_TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwic3RhdHVzIjoiYWRtaW4iLCJpYXQiOjE3MzQzNTE0ODUsImV4cCI6MTczNDM4MDI4NX0.IyY9ggr0VKhVgWXYPOih5RkLLFUrA9J9t7W1Xb0gvqU"
};

export const getCurrentUser = async () => {
    const rep = await axios.get(VITE_URL_API + "user/me/", {
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
};

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
};

export const getEvent = async (eventID) => {
    const rep = await axios.get(VITE_URL_API + "eventManagement/" + eventID, {
        headers: {
            Authorization: `Bearer ${VITE_TOKEN}`,
        }
    });
    return rep.data;
};

export const getUser = async (userID) => {
    const rep = await axios.get(VITE_URL_API + "user/" + userID, {
        headers: {
            Authorization: `Bearer ${VITE_TOKEN}`,
        }
    });
    return rep.data;
};

export const getLocation = async (locationID) => {
    const rep = await axios.get(VITE_URL_API + "location/" + locationID, {
        headers: {
            Authorization: `Bearer ${VITE_TOKEN}`,
        }
    });
    return rep.data;
};

export const getCategory = async (categoryID) => {
    const rep = await axios.get(VITE_URL_API + "category/" + categoryID, {
        headers: {
            Authorization: `Bearer ${VITE_TOKEN}`,
        }
    });
    return rep.data;
}

export const getNbSubscribers = async (eventID) => {
    const rep = await axios.get(VITE_URL_API + "event/nbSubscribers/" + eventID, {
        headers: {
            Authorization: `Bearer ${VITE_TOKEN}`,
        }
    });
    return rep.data;
}