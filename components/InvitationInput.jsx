import React from 'react';
import { ScrollView, View } from 'react-native';
import { Chip} from 'react-native-paper';
import TextInputForm from './TextInputForm';
import TitleFormField from './TitleFormField';

export default function InvitationInput({emailList,emailInput, setEmailInput, handleAddEmail, handleRemoveEmail, styles}) {
    return (
        <View>
            <TitleFormField title="Invitation" styles={styles} />
            
            <TextInputForm value={emailInput} placeholder="Enter email address..." onChangeText={setEmailInput} styles={styles} type={'invitation'} handleAddEmail={handleAddEmail}/>

            <ScrollView horizontal contentContainerStyle={styles.scrollContainerInvitation} showsHorizontalScrollIndicator={false} style={{ marginLeft: 30 }}>
                {emailList.map((email, index) => (
                    <Chip key={index} style={styles.chip} textStyle={styles.chipText} onClose={() => handleRemoveEmail(email)}>
                        {email}
                    </Chip>
                ))}
            </ScrollView>
        </View>
    );
}