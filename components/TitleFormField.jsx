import { View, Text} from 'react-native';

export default function ({title,styles}){
    return(
        <View style={styles.viewTopic}>
            <Text style={styles.viewTopicText}>{title}</Text>
        </View>
    );
};