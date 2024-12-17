import React, {useEffect, useState} from "react";
import {loadEvent} from "../api";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";

function formatDateToReadable(dateString) {
    const date = new Date(dateString);
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
}

function formatTimeRange(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const formatTime = (date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const period = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        const formattedMinutes = minutes.toString().padStart(2, '0');
        return `${formattedHours}.${formattedMinutes} ${period}`;
    };

    const startTime = formatTime(start);
    const endTime = formatTime(end);

    const isDifferentDay = start.toDateString() !== end.toDateString();

    if (isDifferentDay) {
        const readableEndDate = formatDateToReadable(endDate);
        return `${startTime} - ${endTime} (${readableEndDate})`;
    }

    return `${startTime} - ${endTime}`;
}

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
                    <View style={styles.categoryWrapper}>
                        <Text style={styles.category}>{eventData.category}</Text>
                    </View>
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
                            {/*location*/}
                            <View style={styles.infoCell}>
                                <Ionicons name={"location-outline"} size={19} color={"#000"}/>
                                <View style={styles.infoLabelWrapper}>
                                    <Text style={styles.infoLabel}>{eventData.locationName}, {eventData.streetNumber}</Text>
                                </View>
                            </View>
                            {/*hour*/}
                            <View style={styles.infoCell}>
                                <Ionicons name={"time-outline"} size={19} color={"#000"}/>
                                <View style={styles.infoLabelWrapper}>
                                    <Text style={styles.infoLabel}>{formatTimeRange(eventData.startTime, eventData.endTime)}</Text>
                                </View>
                            </View>
                            {/*date*/}
                            <View style={styles.infoCell}>
                                <Ionicons name={"calendar-outline"} size={19} color={"#000"}/>
                                <View style={styles.infoLabelWrapper}>
                                    <Text style={styles.infoLabel}>{formatDateToReadable(eventData.endTime)}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.column}>
                            {/*participant count*/}
                            <View style={styles.infoCell}>
                                <Ionicons name={"people-outline"} size={19} color={"#000"}/>
                                <View style={styles.infoLabelWrapper}>
                                    <Text style={styles.infoLabel}>{eventData.nbSubscribers}</Text>
                                </View>
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
    categoryWrapper: {
        backgroundColor: '#D9D9D9',
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 99,
        paddingHorizontal: 6,
        paddingVertical: 2,
        marginVertical: 5,
        alignSelf: 'flex-start',
    },
    category: {
        fontSize: 11,
        fontWeight: '400',
        color: 'black'
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
    infoLabelWrapper: {
        marginLeft: 5,
    },
    infoLabel: {
        fontSize: 12,
        fontFamily: 'inter',
        fontWeight: 400,
    },
    infoCell: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 2,
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
