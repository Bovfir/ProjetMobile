import {
    getCategory,
    getCurrentUser,
    getDiscussionsFromEventID,
    getDiscussionsMessages,
    getEvent,
    getLocation,
    getNbSubscribers,
    getNewerMessages,
    getOlderMessages,
    getUser,
    postMessage
} from './http.js';

export const loadCurrentUser = async () => {
    try {
        const data = await getCurrentUser();
        return {
            id: data.id,
            email: data.email,
            lastName: data.last_name,
            firstName: data.first_name,
            userName: data.user_name,
            bio: data.bio
        };
    } catch (e) {
        //throw new Error('Un problème est survenu, réessayez plus tard');
        throw new Error(e);
    }
};

export const loadDiscussions = async (eventID) => {
    if(eventID !== undefined){
        try {
            const data = await getDiscussionsFromEventID(eventID);
            return (data.map((discussion) => ({
                id: discussion.discussionid,
                title: discussion.conversationtitle,
                description: discussion.eventdescription,
                lastMessage: discussion.lastmessagecontent,
                lastMessageDate: discussion.lastmessagesendingdate,
                usersCount: discussion.userscount
            })));
        } catch (e) {
            //throw new Error('Un problème est survenu, réessayez plus tard');
            throw new Error(e);
        }
    } else {
        throw new Error('Cette discussion n\'existe pas');
    }
};

export const loadDiscussionMessages = async (discussionID, offset) => {
    if(discussionID !== undefined){
        try {
            const data = await getDiscussionsMessages(discussionID, offset);
            return (data.map((message) => ({
                id: message.messageid,
                content: message.messagecontent,
                sendingDate: message.sendingdate,
                sender: {
                    id: message.userid,
                    username: message.username
                }
            })));
        } catch (e) {
            //throw new Error('Un problème est survenu, réessayez plus tard');
            throw new Error(e);
        }
    } else {
        throw new Error('Cette discussion n\'existe pas');
    }
}

export const loadOlderMessages = async (discussionID, previousMessageID) => {
    try {
        const data = await getOlderMessages(discussionID, previousMessageID);
        return (data.map((message) => ({
            id: message.messageid,
            content: message.messagecontent,
            sendingDate: message.sendingdate,
            sender: {
                id: message.userid,
                username: message.username
            }
        })));
    } catch (e) {
        //throw new Error('Un problème est survenu, réessayez plus tard');
        throw new Error(e);
    }
}

export const loadNewerMessages = async (discussionID, previousMessageID) => {
    try {
        const data = await getNewerMessages(discussionID, previousMessageID);
        return (data.map((message) => ({
            id: message.messageid,
            content: message.messagecontent,
            type: message.messageType,
            sendingDate: message.sendingdate,
            sender: {
                id: message.userid,
                username: message.username
            }
        })));
    } catch (e) {
        //throw new Error('Un problème est survenu, réessayez plus tard');
        throw new Error(e);
    }
}

export const sendMessage = async (discussionID, message) => {
    try {
        const data = {
            content: message.content,
            type: 0,
            user_id: message.sender.id,
            discussion_event_id: discussionID
        }
        const rep = await postMessage(data);
        return rep.data;
    } catch (e) {
        //throw new Error('Un problème est survenu, réessayez plus tard');
        throw new Error(e);
    }
}

export const loadEvent = async (eventID) => {
    try {
        const eventData = await getEvent(eventID);
        const [userData, locationData, categoryData, nbSubscribers] = await Promise.all([
            getUser(eventData.user_id),
            getLocation(eventData.location_id),
            getCategory(eventData.category_id),
            getNbSubscribers(eventID)
        ]);

        return {
            id: eventData.id,
            title: eventData.title,
            description: eventData.description,
            startTime: eventData.event_start,
            endTime: eventData.event_end,
            streetNumber: eventData.street_number,
            isPrivate: eventData.isprivate,
            picturePath: eventData.picture_path,
            ownerName: userData.user_name,
            locationName: locationData.label,
            category: categoryData.title,
            nbSubscribers: nbSubscribers.count
        };
    } catch (e) {
        //throw new Error('Un problème est survenu, réessayez plus tard');
        throw new Error(e);
    }
}