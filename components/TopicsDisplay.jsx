import {loadDiscussions} from '../api/index';
import Discussion from './DiscussionInformation'
import {useEffect, useState} from "react";
import {View, Text, StyleSheet} from "react-native";

export default function TopicsDisplay({eventID}) {
    const [discussions, setDiscussions] = useState([]);
    const [load, setLoad] = useState({
        loaded: false,
        loading: false,
        error: false,
        errorMessage: ''
    });

    useEffect(() => {
        function search(){
            setLoad({
                loaded: false,
                loading: true,
                error: false,
                errorMessage: ''
            });
            loadDiscussions(eventID).then(result => {
                setDiscussions(result);
                setLoad({
                    loaded: true,
                    loading: false,
                    error: false,
                    errorMessage: ''
                });
            }, error => {
                setLoad({
                    loaded: true,
                    loading: false,
                    error: true,
                    errorMessage: error.message
                });
            });
        }
        search();
    },[]);

    let Content;
    if(load.loading === true){
        Content =  <Text>Chargement en cours</Text>;
    } else if(load.error){
        Content = <Text>{load.errorMessage}</Text>;
    } else if(discussions.length !== 0){
        Content = discussions.map((discussion) => (
            <Discussion key={discussion.id} discussion={discussion} />
        ));
    } else {
        Content = <Text>No discussions</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Topics</Text>
            {Content}
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
