import React, { useState } from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { styleFormEvent } from '../styles/stylesFormEvent';

const DateTimeSelector = ({
  eventStart,
  timeStart,
  eventEnd,
  timeEnd,
  onChangeEventStart,
  onChangeTimeStart,
  onChangeEventEnd,
  onChangeTimeEnd,
}) => {
  const [showPicker, setShowPicker] = useState({ visible: false, mode: 'date', pickerFor: null });

  const currentDate = new Date(); 

  const onChangePicker = (event, selectedValue) => {
    if (event.type === 'set' && selectedValue) {
      const selectedDate = new Date(selectedValue);

      if (showPicker.pickerFor === 'startDate') {
        if (selectedDate >= currentDate) {
          onChangeEventStart(selectedValue);
          if (eventEnd < selectedDate) {
            onChangeEventEnd(selectedDate); 
          }
        } else {
          Alert.alert("Erreur", "La date de début ne peut pas être antérieure à aujourd'hui.");
        }
      } else if (showPicker.pickerFor === 'endDate') {
        if (selectedDate > eventStart || (selectedDate.toDateString() === eventStart.toDateString() && timeEnd > timeStart)) {
          onChangeEventEnd(selectedValue);
        } else {
          Alert.alert("Erreur", "La date de fin ne peut pas être avant la date ou l'heure de début.");
        }
      } else if (showPicker.pickerFor === 'startTime') {
        onChangeTimeStart(selectedValue);
        if (eventStart.toDateString() === eventEnd.toDateString() && timeEnd <= selectedValue) {
          onChangeTimeEnd(new Date(selectedValue.getTime() + 60 * 60 * 1000)); 
        }
      } else if (showPicker.pickerFor === 'endTime') {
        if (eventStart.toDateString() !== eventEnd.toDateString() || selectedValue > timeStart) {
          onChangeTimeEnd(selectedValue);
        } else {
          Alert.alert("Erreur", "L'heure de fin ne peut pas être avant l'heure de début.");
        }
      }
    }
    setShowPicker({ visible: false, mode: 'date', pickerFor: null });
  };

  return (
    <View style={styleFormEvent.viewDateTimeContainer}>
      <View style={styleFormEvent.viewRectangle}>
        <View style={styleFormEvent.viewTextInputContainer}>
          <View style={styleFormEvent.row}>
            <Text style={{ alignContent: 'center', alignSelf: 'center', marginRight: 10 }}>Event Start</Text>
            <Pressable
              style={styleFormEvent.viewTextInputDate}
              onPress={() => setShowPicker({ visible: true, mode: 'date', pickerFor: 'startDate' })}
            >
              <View style={styleFormEvent.dateAndIcon}>
                <Text style={{ fontSize: 12, flex: 1, textAlign: 'left' }}>
                  {eventStart.toLocaleDateString()}
                </Text>
                <MaterialIcons name="calendar-month" size={20} color="#4B0082" />
              </View>
            </Pressable>

            <Pressable
              style={styleFormEvent.viewTextInputTime}
              onPress={() => setShowPicker({ visible: true, mode: 'time', pickerFor: 'startTime' })}
            >
              <View style={styleFormEvent.dateAndIcon}>
                <Text>
                  {timeStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
                <Feather name="clock" size={20} color="#4B0082" />
              </View>
            </Pressable>
          </View>

          <View style={styleFormEvent.row}>
            <Text style={{ alignContent: 'center', alignSelf: 'center', marginRight: 10 }}>Event End</Text>
            <Pressable
              style={styleFormEvent.viewTextInputDate}
              onPress={() => setShowPicker({ visible: true, mode: 'date', pickerFor: 'endDate' })}
            >
              <View style={styleFormEvent.dateAndIcon}>
                <Text style={{ fontSize: 12, flex: 1, textAlign: 'left' }}>
                  {eventEnd.toLocaleDateString()}
                </Text>
                <MaterialIcons name="calendar-month" size={20} color="#4B0082" />
              </View>
            </Pressable>

            <Pressable
              style={styleFormEvent.viewTextInputTime}
              onPress={() => setShowPicker({ visible: true, mode: 'time', pickerFor: 'endTime' })}
            >
              <View style={styleFormEvent.dateAndIcon}>
                <Text>
                  {timeEnd.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
                <Feather name="clock" size={20} color="#4B0082" />
              </View>
            </Pressable>
          </View>
        </View>
      </View>
      {showPicker.visible && (
        <DateTimePicker
          value={
            showPicker.pickerFor === 'startDate'
              ? eventStart
              : showPicker.pickerFor === 'endDate'
              ? eventEnd
              : showPicker.pickerFor === 'startTime'
              ? timeStart
              : timeEnd
          }
          mode={showPicker.mode}
          display="default"
          onChange={onChangePicker}
          minimumDate={showPicker.pickerFor === 'startDate' ? currentDate : undefined} 
        />
      )}
    </View>
  );
};

export default DateTimeSelector;
