import * as ImagePicker from 'expo-image-picker'; 

export const PickImage = async ({ onSelectedImage, type = 'event' }) => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
        alert("Permission to access gallery is required!");
        return;
    }

    const aspectRatio = type === 'avatar' ? [1, 1] : [4, 3];

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true, 
        aspect: aspectRatio,
        quality: 1,
    });

    if (!result.canceled) {
        onSelectedImage(result.assets[0].uri); 
    }
};
