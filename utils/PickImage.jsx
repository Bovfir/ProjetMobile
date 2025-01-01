import * as ImagePicker from 'expo-image-picker'; 

const PickImage = async ({ onSelectedImage, type = 'event' }) => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
        alert("Permission to access gallery is required!");
        return;
    }

    // Définir l'aspect ratio selon le type
    const aspectRatio = type === 'avatar' ? [1, 1] : [4, 3];

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true, 
        aspect: aspectRatio, // Utiliser l'aspect ratio pour le crop
        quality: 1,
    });

    if (!result.canceled) {
        onSelectedImage(result.assets[0].uri); 
    }
};

export default PickImage;
