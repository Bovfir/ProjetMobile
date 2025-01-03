import React, { useState } from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { styleFormEvent } from '../styles/stylesFormEvent';
import { showToast } from '../utils/utils';

const DateTimeSelector = ({eventStart,timeStart,eventEnd,timeEnd,onChangeEventStart,onChangeTimeStart,onChangeEventEnd,onChangeTimeEnd}) => {
  const [showPicker, setShowPicker] = useState({ visible: false, mode: 'date', pickerFor: null });

  const parseDateTime = (date, time) => {
    const [hours, minutes] = time.split(':');
    const newDate = new Date(date);
    newDate.setHours(hours, minutes, 0, 0);
    return newDate;
  };

  const handlePickerChange = (event, selectedValue) => {
    if (event.type === 'set' && selectedValue) {
      const selectedDate = new Date(selectedValue);
      if (showPicker.pickerFor === 'startDate') {
        if (selectedDate <= new Date(eventEnd)) {
          onChangeEventStart(selectedDate.toISOString().split('T')[0]);
        } else {
          showToast('error','Input error','The start date cannot be after the end date.');
          //Alert.alert('Erreur', 'The start date cannot be after the end date.');
        }
      } else if (showPicker.pickerFor === 'endDate') {
        if (selectedDate >= new Date(eventStart)) {
          onChangeEventEnd(selectedDate.toISOString().split('T')[0]);
        } else {
          showToast('error','Input error','The end date cannot be before the start date.');
          //Alert.alert('Erreur', 'La date de fin ne peut pas être avant la date de début.');
        }
      } else if (showPicker.pickerFor === 'startTime') {
        const updatedStartTime = selectedDate.toTimeString().slice(0, 5);
        if (parseDateTime(eventStart, updatedStartTime) < parseDateTime(eventEnd, timeEnd)) {
          onChangeTimeStart(updatedStartTime);
        } else {
          showToast('error','Input error','The start time cannot be after the end time.');
          //Alert.alert('Erreur', "L'heure de début doit être avant l'heure de fin.");
        }
      } else if (showPicker.pickerFor === 'endTime') {
        const updatedEndTime = selectedDate.toTimeString().slice(0, 5);
        if (parseDateTime(eventStart, timeStart) < parseDateTime(eventEnd, updatedEndTime)) {
          onChangeTimeEnd(updatedEndTime);
        } else {
          showToast('error','Input error','The end time cannot be before the start time.');
          //Alert.alert('Erreur', "L'heure de fin doit être après l'heure de début.");
        }
      }
    }
    setShowPicker({ visible: false, mode: 'date', pickerFor: null });
  };

  return (
    <View style={styleFormEvent.viewDateTimeContainer}>
      <View style={styleFormEvent.viewRectangle}>
        
        <View style={styleFormEvent.row}>
          <Text style={styleFormEvent.label}>Event Start</Text>
          
          <Pressable style={styleFormEvent.viewTextInputDate}
            onPress={() => setShowPicker({ visible: true, mode: 'date', pickerFor: 'startDate' })}>
            <View style={styleFormEvent.dateAndIcon}>
              <Text>{eventStart}</Text>
              <MaterialIcons name="calendar-month" size={20} color="#4B0082" />
            </View>
          </Pressable>
          
          <Pressable style={styleFormEvent.viewTextInputTime}
            onPress={() => setShowPicker({ visible: true, mode: 'time', pickerFor: 'startTime' })}>
            <View style={styleFormEvent.dateAndIcon}>
              <Text>{timeStart}</Text>
              <Feather name="clock" size={20} color="#4B0082" />
            </View>
          </Pressable>
        </View>


        <View style={styleFormEvent.row}>
          <Text style={styleFormEvent.label}>Event End</Text>
          
          <Pressable style={styleFormEvent.viewTextInputDate}
            onPress={() => setShowPicker({ visible: true, mode: 'date', pickerFor: 'endDate' })}>
            <View style={styleFormEvent.dateAndIcon}>
              <Text>{eventEnd}</Text>
              <MaterialIcons name="calendar-month" size={20} color="#4B0082" />
            </View>
          </Pressable>
          
          <Pressable style={styleFormEvent.viewTextInputTime}
            onPress={() => setShowPicker({ visible: true, mode: 'time', pickerFor: 'endTime' })}>
            <View style={styleFormEvent.dateAndIcon}>
              <Text>{timeEnd}</Text>
              <Feather name="clock" size={20} color="#4B0082" />
            </View>
          </Pressable>
        </View>

      </View>

      {showPicker.visible && (
        <DateTimePicker
          value={
            showPicker.pickerFor === 'startDate'
              ? new Date(eventStart)
              : showPicker.pickerFor === 'endDate'
              ? new Date(eventEnd)
              : showPicker.pickerFor === 'startTime'
              ? new Date(`1970-01-01T${timeStart}:00`)
              : new Date(`1970-01-01T${timeEnd}:00`)
          }
          mode={showPicker.mode}
          is24Hour={true}
          display="default"
          onChange={handlePickerChange}
        />
      )}
    </View>
  );
};

export default DateTimeSelector;
