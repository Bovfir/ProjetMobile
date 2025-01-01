import { StyleSheet } from "react-native";


export const stylesMessageInput = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "white",
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