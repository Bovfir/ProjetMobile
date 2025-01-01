import { StyleSheet } from "react-native";

export const stylesCustomAlert = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      alertBox: {
        width: 250,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        elevation: 5,
      },
      alertText: {
        fontSize: 16,
        marginBottom: 10,
        color: '#333',
      },
      buttonStyle : {
          backgroundColor:"#4B0082",
          width: 100,
          borderRadius: 10
        }
});