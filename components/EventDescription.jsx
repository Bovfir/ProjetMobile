import { View, TextInput } from 'react-native-paper';

export default function EventDescription({ placeholder = "Enter a description...", description, onChangeText, styles }) {
    return (
        <View style={styles.textInputContainerDescription}>
            <TextInput
                style={styles.textInputDescription}
                multiline={true}
                numberOfLines={4}
                placeholder={placeholder}
                placeholderTextColor="#878787"
                value={description}
                onChangeText={onChangeText}
            />
        </View>
    );
}
