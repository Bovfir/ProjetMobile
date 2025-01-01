import React from 'react';
import { HelperText } from 'react-native-paper';


export default function HelperTextField ({touched, errors, fieldName, style}) {
    if(touched[fieldName] && errors[fieldName]){
        return (
            <HelperText type='error' visible={touched[fieldName] && errors[fieldName]} style={style}>
                {errors[fieldName]}
            </HelperText>
        );
    }
    return null;
}