import {  View, TextInput} from "react-native"
import { Header } from "../components/Header"
import {LoginButton} from "../components/LoginButton"
import { RegisterButton } from "../components/RegisterButton"
import * as Yup from 'yup';
import { Formik } from 'formik';
import {styles} from "../styles/stylesLogin"
import { Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import * as APIConnection from '../API/getApi';



export default function Connection(){
    const navigation = useNavigation()

    const handleSubmit = async (data) =>{
        const response = await APIConnection.login(data);
        console.log(response);
        if(response === 'ok'){
            navigation.navigate('Profile',{registration: true})
        }else{
            console.log(response);
        }
    }


    return (
        <View style={styles.container}>
            <Header
                title={'EventFlow'}
                titleSize={41}
                subTitle={'Where event come to life'}
                subTitleSize={15}
                distanceTop={200}
            />
            <Toast/>
            <Formik
                initialValues={{email:"", password:""}}
                validationSchema={Yup.object({
                    email:Yup.string().email('Invalid email').required('Required'),
                    password:Yup.string().required('Required')
                })}
                onSubmit={(values) => handleSubmit(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={styles.formBox}>
                        <TextInput
                            mode="outlined"
                            label="Email"
                            placeholder="Type your email"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            style={styles.input}

                        />
                        {touched.email && errors.email ? (
                            <Text style={ styles.error}>{errors.email}</Text>
                        ) : null}

                        <TextInput
                            mode="outlined"
                            label="Password"
                            placeholder="Type your password"
                            secureTextEntry
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            style={styles.input}
                        />
                        {touched.password && errors.password ? (
                            <Text style={ styles.error }>{errors.password}</Text>
                        ) : null}

                            <View style={styles.button}>
                                <LoginButton onPress={handleSubmit}/>
                            </View>
                            <View style={styles.button} >
                                <RegisterButton onPress={()=> navigation.navigate('UserForm')}/>
                            </View>
                    </View> 
            )}
            </Formik>
            
        </View>
    )
}
