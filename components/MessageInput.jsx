import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { sendMessage } from "../api/index";

export default function MessageInput({ currentUser, discussionID, onNewMessage }) {
    const [messageContent, setMessageContent] = useState("");

    const handleSend = () => {
        if (messageContent.trim().length > 0) {
            const message = {
                content: messageContent,
                sender: {
                    id: currentUser.id,
                    userName: currentUser.userName,
                }
            };
            setMessageContent("");

            sendMessage(discussionID, message).then(() => {
                onNewMessage();
            }).catch((error) => {
                console.error("Error sending message:", error);
            });
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Type your message..."
                value={messageContent}
                onChangeText={setMessageContent}
                onSubmitEditing={handleSend} // Allow sending with "Enter" key
            />
            <TouchableOpacity style={styles.button} onPress={handleSend}>
                <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#f5f5f5",
        borderTopWidth: 1,
        borderColor: "#ddd",
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 20,
        paddingHorizontal: 15,
        backgroundColor: "#fff",
    },
    button: {
        marginLeft: 10,
        backgroundColor: "#6200EE",
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});
