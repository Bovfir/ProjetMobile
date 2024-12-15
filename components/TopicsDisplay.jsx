import {loadDiscussions} from '../api/index';
import Discussion from './DiscussionInformation'
import {useEffect, useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import DiscussionHeader from "./DiscussionHeader";
import {useNavigation} from "@react-navigation/native";

export default function TopicsDisplay({eventID, currentUser}) {
    const navigation = useNavigation();
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
            <TouchableOpacity key={discussion.id} onPress={() => navigation.navigate('DiscussionChat', { currentUser, discussionID: discussion.id, discussionTitle: discussion.title })}>
                <Discussion key={discussion.id} discussion={discussion} />
            </TouchableOpacity>
        ));
    } else {
        Content = <Text>No discussions</Text>;
    }

    return (
        <View style={styles.container}>
            <DiscussionHeader title={"Topics"} />
            <View style={styles.titleWrapper}>
                <Text style={styles.title}>Topics</Text>
            </View>
            <View style={styles.content}>
                {Content}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    titleWrapper: {
        margin: 15,
    },
    title: {
        color: 'black',
        fontSize: 24,
        fontFamily: 'Inter',
        fontWeight: 'bold',
        wordWrap: 'break-word',
    },
    container: {
        height: '100%',
    },
    content: {
        flex: 1,
        alignItems: 'center',
    }
});
