import {StyleSheet, Text, View} from 'react-native';
import TopicsDisplay from "../components/TopicsDisplay";

export default function Explore() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Explore</Text>
            <TopicsDisplay eventID={1} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
});