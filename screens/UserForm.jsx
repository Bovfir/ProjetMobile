import {Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import styles from '../styles/stylesUserForm';
import { TextInput, HelperText } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Header } from '../components/Header';
import * as APIConnection from '../API/getApi';
import { useNavigation } from '@react-navigation/native';


export default function UserForm({route}){
    const { registration, data } = route.params || {};
    const navigation = useNavigation()

    const handleValueForm = async (values) =>{       
        if(registration){
            await APIConnection.createUser(values);
            navigation.navigate('Connection');
        }else{
            await APIConnection.patchUser(values);
            navigation.navigate('ProfileNav');
        }
    }
    return(
        <View style={styles.container}>
            <Header title={'Form'} backButton={true}/>
            <View>
                <Text style={styles.text}>Vos informations personnelles :</Text>
            </View>
        
            <TouchableOpacity style={styles.profileImage}>
                <View style={styles.boxImage}>
                    <Image source={require('../assets/test.jpg')} style={styles.image}/>
                </View>
            </TouchableOpacity>

            <ScrollView
                style={styles.scrollZone}
                vertical={true}
                showsVerticalScrollIndicator={false}>
                <Formik
                    initialValues={registration 
                        ? { email: "", password: "", last_name: "", first_name: "", user_name: "", bio: "" } 
                        : { ...data }
                      }
                    validationSchema={Yup.object({
                        email:Yup.string().email('Invalid email').required('Required'),
                        password: registration 
                        ? Yup.string().min(6, 'Must be at least 6 characters').required('Required')
                        : Yup.string().min(6, 'Must be at least 6 characters'), 
                        last_name: Yup.string().max(25, 'Must be max 25 character'),
                        first_name: Yup.string().max(25, 'Must be max 25 character'),
                        user_name: Yup.string().max(10, 'Must be max 10 character').required('Required'),
                        bio: Yup.string().max(100, 'Must be max 100 character' )
                    })}
                    onSubmit={(values) => handleValueForm(values)}
                    >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View style={styles.form}>
                            <TextInput
                                label="Email"
                                placeholder="Email"
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                error={touched.email && errors.email}
                                />
                            <HelperText
                                type="error"
                                visible={touched.email && errors.email}
                            >
                            {errors.email}
                            </HelperText>
                            
                            <TextInput
                                label="Password"
                                placeholder="Password"
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                secureTextEntry
                                error={touched.password && errors.password}
                            />
                            <HelperText
                                type="error"
                                visible={touched.password && errors.password}
                            >
                            {errors.password}
                            </HelperText>

                            <TextInput
                                label='Pseudo'
                                placeholder="Pseudo"
                                onChangeText={handleChange('user_name')}
                                onBlur={handleBlur('user_name')}
                                value={values.user_name}
                                error={touched.user_name && errors.user_name}
                                />
                            <HelperText
                                type="error"
                                visible={touched.user_name && errors.user_name}
                            >
                            {errors.pseudo}
                            </HelperText>
                            
                            <TextInput
                                label="Last name"
                                placeholder="Enter user name"
                                value={values.last_name}
                                error={touched.last_name && errors.last_name}
                                onChangeText={handleChange('last_name')}
                                onBlur={handleBlur('last_name')}
                            />
                            <HelperText
                                type="error"
                                visible={touched.last_name && errors.last_name}
                            >
                            {errors.lastName}
                            </HelperText>
                            
                            <TextInput
                                label='First name'
                                placeholder='Enter your last name'
                                value ={values.first_name}
                                error={touched.first_name && errors.first_name}
                                onChangeText={handleChange('first_name')}
                                onBlur={handleBlur('first_name')}
                            />
                            <HelperText
                                type="error"
                                visible={touched.first_name && errors.first_name}
                            >
                            {errors.firstName}
                            </HelperText>

                            <TextInput
                                mode='flat'
                                label='Bio'
                                multiline
                                placeholder='Enter your bio'
                                value ={values.bio}
                                error={touched.bio && errors.bio}
                                onChangeText={handleChange('bio')}
                                onBlur={handleBlur('bio')}
                                style={styles.inPutHeight}
                            />
                            <HelperText
                                type="error"
                                visible={touched.bio && errors.bio}
                            >
                            {errors.firstName}
                            </HelperText>

                            <TouchableOpacity 
                                style={styles.submit} 
                                onPress={handleSubmit}
                            >
                                <Text style={{ color: 'white', textAlign: 'center' }}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
                <View style={styles.blankZone}></View>
            </ScrollView>
        </View>
    )
}