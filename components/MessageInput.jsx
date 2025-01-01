import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text} from "react-native";
import { postMessage as APIPostMessage} from "../API/index";
import { stylesMessageInput } from "../styles/stylesMessageInput";

export default function MessageInput({ currentUser, discussionID, is_writable,eventcreatorusername }) {
    const [messageContent, setMessageContent] = useState("");

    const postData = async () => {
        try {
            if (messageContent.trim().length > 0) {
                const message = {
                    content: messageContent,
                    sender: {
                        id: currentUser.id,
                        userName: currentUser.userName,
                    }
                };
                const data = {
                    content: message.content,
                    type: 0,
                    user_id: message.sender.id,
                    discussion_event_id: discussionID
                }
                setMessageContent("");
                await APIPostMessage(data);
            }
        } catch (error){
            console.log(error);
        }
    };

    return (
        <>
            {(eventcreatorusername === currentUser.user_name || is_writable) &&(
                <View style={stylesMessageInput.container}>
                <TextInput
                    style={stylesMessageInput.input}
                    placeholder="Type your message..."
                    value={messageContent}
                    onChangeText={setMessageContent}
                    onSubmitEditing={() => postData()} 
                />
                <TouchableOpacity style={stylesMessageInput.button} onPress={() => postData()}>
                    <Text style={stylesMessageInput.buttonText}>Send</Text>
                </TouchableOpacity>
            </View>
            )}
        </>
    );
};
