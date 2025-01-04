import React from 'react';
import { View, Pressable, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { URLImage } from '../API/APIUrl'; 
import PickImage from '../utils/PickImage'; 

const EventImageSelector = ({ event, selectedImage, setSelectedImage, setFieldValue, styles }) => {
  return (
    <View style={styles.containerCenterImage}>
      <View style={styles.viewImage}>
        <Pressable
          onPress={() =>
            PickImage({
              onSelectedImage: (imageUri) => {
                setSelectedImage(imageUri);
                setFieldValue('image', imageUri); 
              },
            })
          }
        >
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={{ width: 305, height: 135, borderRadius: 10 }}/>
          ) : event?.picture_path ? (
            <Image source={{ uri: `${URLImage}/${event.picture_path}` }} style={{ width: 305, height: 135, borderRadius: 10 }}/>
          ) : (
            <MaterialIcons name="add-a-photo" size={50} color="#E7E1E1" />
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default EventImageSelector;
