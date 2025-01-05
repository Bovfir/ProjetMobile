import React,{useContext} from "react"
import {  View, TextInput, Text} from "react-native"
import Header from "../../components/Header"
import LoginButton from "../../components/LoginButton"
import  RegisterButton  from "../../components/RegisterButton"
import * as Yup from 'yup';
import { Formik } from 'formik';
import {stylesLogin} from "../../styles/stylesLogin"
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import * as APIConnection from '../../API/index';
import { AuthContext } from "../../utils/AuthContext";
import { showToast } from "../../utils/utils"


export default function Connection(){
    const navigation = useNavigation();
    const { login } = useContext(AuthContext);

    const handleSubmit = async (data) =>{
        data.email = data.email.toLowerCase();
        try {
            const response = await APIConnection.login(data);
            if(response === 'ok'){
                const token = await APIConnection.getToken(); 
                await login(token);

                showToast('success','Connection successful','You are now connected.');

            } else {
                showToast('error','Connection error',`${response}`);
            }
        } catch (error) {
            if(error.status === 404){
                showToast('error','Connection failed','Email or Password incorrect. Please try again.');
            } else {
                showToast('error','Connection error','An error has occurred. Please try later.');
            }
        }
    }


    return (
        <View style={stylesLogin.container}>
            <Header title={'EventFlow'} titleSize={41} subTitle={'Where event come to life'} subTitleSize={15} distanceTop={200}/>
            <Toast/>
            <Formik initialValues={{email:"", password:""}}
                validationSchema={Yup.object({
                    email:Yup.string().email('Invalid email').required('Required'),
                    password:Yup.string().required('Required')
                })}
                onSubmit={(values) => handleSubmit(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={stylesLogin.formBox}>
                        <TextInput
                            mode="outlined"
                            label="Email"
                            placeholder="Type your email"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            style={stylesLogin.input}

                        />
                        {touched.email && errors.email ? (
                            <Text style={ stylesLogin.error}>{errors.email}</Text>
                        ) : null}

                        <TextInput
                            mode="outlined"
                            label="Password"
                            placeholder="Type your password"
                            secureTextEntry
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            style={stylesLogin.input}
                        />
                        {touched.password && errors.password ? (
                            <Text style={ stylesLogin.error }>{errors.password}</Text>
                        ) : null}

                            <View style={stylesLogin.button}>
                                <LoginButton onPress={handleSubmit}/>
                            </View>
                            <View style={stylesLogin.button} >
                                <RegisterButton onPress={()=> navigation.navigate('UserForm', {registration: true})}/>
                            </View>
                    </View> 
            )}
            </Formik>
            
        </View>
    )
}
