import React, {useEffect, useState} from "react";
import {loadEvent} from "../api";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";

export default function EventPresentation({eventID}) {
    const navigation = useNavigation();

    const [eventData, setEventData] = useState({});
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
            loadEvent(eventID).then(result => {
                setEventData(result);
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
    if(load.loading === true) {
        Content =  <Text>Chargement en cours</Text>;
    } else if(load.error) {
        Content = <Text>{load.errorMessage}</Text>;
    } else if(eventData) {
        Content = (
            <View style={styles.presentationContainer}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconContainer}>
                        <Ionicons name="return-up-back-outline" size={40} color="#000" />
                    </TouchableOpacity>
                    <View style={styles.titleWrapper}>
                        <Text style={styles.title}>Detail Event</Text>
                    </View>
                </View>

                <View style={styles.frameContainer}>
                    <Text>Picture</Text>
                </View>

                <View style={styles.eventNameWrapper}>
                    <Text style={styles.eventName}>{eventData.title}</Text>
                </View>

                <View style={styles.ownerPresentation}>
                    <View style={styles.ownerNameWrapper}>
                        <Text style={styles.ownerName}>{eventData.ownerName}</Text>
                    </View>
                </View>

                <View style={styles.frameContainer}>
                    <View style={styles.infoTable}>
                        <View style={styles.column}>
                            <View style={styles.locationWrapper}>
                                <Text style={styles.location}>{eventData.locationName}, {eventData.streetNumber}</Text>
                            </View>
                            <View style={styles.hourWrapper}>
                                <Text style={styles.hour}>{eventData.startTime}</Text>
                            </View>
                            <View style={styles.dateWrapper}>
                                <Text style={styles.date}>{eventData.endTime}</Text>
                            </View>
                        </View>
                        <View style={styles.column}>
                            <View style={styles.participantWrapper}>
                                <Text style={styles.participant}>{eventData.nbSubscribers}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.eventDescriptionWrapper}>
                    <Text style={styles.eventDescriptionLabel}>About Event</Text>
                    <View style={styles.frameContainer}>
                        <Text style={styles.eventDescription}>{eventData.description}</Text>
                    </View>
                </View>
            </View>
        );
    } else {
        Content = <Text>No Event</Text>;
    }

    return (
        <View style={styles.container}>
            {Content}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    presentationContainer: {
        flex: 1,
        width: '90%',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconContainer: {
        marginLeft: 5,
    },
    titleWrapper: {
        flex: 1,
        alignItems: 'center',
        marginRight: 40, // Ajustement pour l'alignement centré
    },
    title: {
        fontSize: 20,
        fontFamily: 'Bruno Ace SC',
        fontWeight: '400',
        color: '#C497E5',
        wordWrap: 'break-word',
    },
    frameContainer: {
        width: '100%',
        marginVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#C497E5',
        overflow: 'hidden',
        elevation: 3,
        padding: 10,
    },
    eventNameWrapper: {
        marginTop: 5,
        marginBottom: 10,
        alignItems: 'center',
    },
    eventName: {
        fontSize: 24,
        fontFamily: 'Inter',
        fontWeight: '500',
        color: '#C497E5',
        wordWrap: 'break-word',
    },
    ownerPresentation: {
        alignItems: 'center',
    },
    ownerNameWrapper: {
        backgroundColor: '#FFF',
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 8,
        marginVertical: 5,
    },
    ownerName: {
        fontSize: 12,
        fontWeight: '600',
        color: '#333',
    },
    infoTable: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    column: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    locationWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    location: {
        fontSize: 14,
        color: '#555',
        fontWeight: '600',
    },
    hourWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    hour: {
        fontSize: 14,
        color: '#888',
    },
    dateWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    date: {
        fontSize: 14,
        color: '#888',
    },
    participantWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    participant: {
        fontSize: 18,
        fontWeight: '600',
        color: '#555',
    },
    eventDescriptionWrapper: {
        width: '100%',
        marginTop: 10,
    },
    eventDescriptionLabel: {
        fontSize: 16,
        fontWeight: '400',
        color: '#C497E5',
        fontFamily: 'Inter',
        marginBottom: 5,
    },
    eventDescription: {
        fontSize: 13,
        color: '#444',
        lineHeight: 18,
    },
});
