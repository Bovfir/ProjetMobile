import {ActivityIndicator, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import {useEffect, useState} from "react";
import {getCurrentUser as APIGetCurrentUser} from '../../API/index';
import TopicsDisplay from "../../components/TopicsDisplay";
import { stylesTopics } from '../../styles/stylesTopics';
import { showToast } from '../../utils/utils';
import { useNavigation } from '@react-navigation/native';

export default function Topics({route}) {
    const {event} = route.params;
    const [currentUser, setCurrentUser] = useState({});
    const [load, setLoad] = useState({loading: false,error: false,errorMessage: ''});
    const navigation = useNavigation();

    const fetchData = async () => {
        try {
            setLoad({ loading: true, error: false, errorMessage: '' });
            
            const userResponse = await APIGetCurrentUser();
            setCurrentUser(userResponse); 
        } catch (error) {
            showToast('error','Recovery error','Something went wrong. Please try again later.');
            navigation.goBack();
        } finally {
            setLoad({ loading: false, error: false, errorMessage: '' }); 
        }
    };
    
    useEffect(() => {
        fetchData();
    }, []);
    

    let content = <Text>No user data available</Text>;

    if (load.loading) {
        content = <ActivityIndicator size="large" color="#6200EE" />;
    } 
    
    if (load.error) {
        content = <Text>Error: {load.errorMessage}</Text>;
    } 
    
    if (currentUser.id) {
        content = <TopicsDisplay event={event} currentUser={currentUser} />;
    } 

    return (
        <SafeAreaView style={stylesTopics.safeContainer}>
            <View style={stylesTopics.container}>
                {content}
            </View>
        </SafeAreaView>
    );
};