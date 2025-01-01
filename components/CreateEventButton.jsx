import React from 'react';
import { View } from 'react-native';
import { Button } from '@rneui/themed';

export default function CreateEventButton({onPress, styles, event}) {
    return(
        <View style={styles.containerButton}>
            <View style={styles.viewButtonCreateEvent}>
                <Button title={event ? "Update Event": "Create Event"} buttonStyle={styles.buttonCreateEvent} onPress={onPress}/>
            </View>
        </View>
    );

};