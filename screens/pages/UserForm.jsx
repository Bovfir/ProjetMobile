import {Text, View, TouchableOpacity, Image, ScrollView, Pressable} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import { useState } from 'react';
import {stylesUserForm} from '../../styles/stylesUserForm';
import { TextInput, HelperText } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Header } from '../../components/Header';
import * as API from '../../API/index';
import { useNavigation } from '@react-navigation/native';
import PickImage from '../../utils/PickImage';
import { uploadImage as APIUploadImage } from '../../API/index';
import { URLImage } from '../../API/APIUrl';
import { showToast } from '../../utils/utils';


export default function UserForm({route}){
    const { registration, data } = route.params || {};
    const navigation = useNavigation();
    const [selectedImage, setSelectedImage] = useState(null);  

    const handleValueForm = async (values) => {
        try { 
            const updatedValues = { ...values };
            
            if (selectedImage) {
                const imagePath = await APIUploadImage({ imageUri: selectedImage });
                updatedValues.picture_path = imagePath;
            }
            updatedValues.email = updatedValues.email.toLowerCase();
            updatedValues.user_name = updatedValues.user_name.toLowerCase();

            if (registration) {
                await API.createUser(updatedValues);

                showToast('success','Account created','Your account has been successfully created.');

                navigation.navigate('Login');
            } else {
                const fieldsToUpdate = {};
                Object.keys(updatedValues).forEach((key) => {
                    if (updatedValues[key] !== data[key]) {
                        fieldsToUpdate[key] = updatedValues[key];
                    }
                });

                if (values.password) {
                    fieldsToUpdate.password = values.password;
                }

                if (Object.keys(fieldsToUpdate).length === 0) {
                    showToast('info','No changes detected','No updates were made.');
                } else {
                    await API.patchUser(fieldsToUpdate);
                    showToast('success','Updated successfully','Your information has been updated.')
                }
                navigation.navigate('ProfileMain');
            }
        } catch (error) {
            if(error.status === 409){
                showToast('error',`Error : ${error.message}`,'Please enter a another value.');
            } else {
                if(error.status === 400){
                    showToast('error',`Error : ${error.message}`,'Please upload an another value.');
                } else {
                    showToast('error','Error','LASomething went wrong. Please try again later.');
                }
            }
        }
    };
    
    return(
        <View style={stylesUserForm.container}>
            <Header title={'Form'} backButton={true} navigation={navigation}/>
            
            <View style={stylesUserForm.titleContainer}>
                <Text style={stylesUserForm.text}>Vos informations personnelles :</Text>
            </View>
        
            <View style={stylesUserForm.containerCenterImage}>
                <View style={stylesUserForm.viewImage}>
                    <Pressable onPress={() => PickImage({ type: 'avatar',
                                onSelectedImage: (imageUri) => { setSelectedImage(imageUri)}})}>
                        {selectedImage ? (
                            <Image source={{ uri: selectedImage }} style={stylesUserForm.avatarImage}/>
                        ) : !registration && data?.picture_path ? (
                            <Image source={{ uri: `${URLImage}/${data.picture_path}` }} style={stylesUserForm.avatarImage}/>
                        ) : (
                            <MaterialIcons name="add-a-photo" size={50} color="#E7E1E1" backgroundColor="white"/>
                        )}
                    </Pressable>
                </View>
            </View>


            <ScrollView style={stylesUserForm.scrollZone} vertical={true} showsVerticalScrollIndicator={false}>
                <Formik
                    initialValues={registration 
                        ? { email: "", password: "", last_name: "", first_name: "", user_name: "", bio: "" } 
                        : { ...data }
                      }
                    validationSchema={Yup.object({
                        email:Yup.string().email('Invalid email').required('Required'),
                        password: registration 
                        ? Yup.string()
                        .required('The password is required')
                        .min(8, 'The password must be at least 8 characters long')
                        .max(255, 'The password must be no longer than 255 characters')
                        .matches(/[A-Z]/, 'The password must contain at least one uppercase letter')
                        .matches(/\d/, 'The password must contain at least one number')
                        .matches(/[.#@$!%*?&]/, 'The password must contain at least one special character')
                    : Yup.string()
                        .nullable() 
                        .min(8, 'The password must be at least 8 characters long')
                        .max(255, 'The password must be no longer than 255 characters')
                        .matches(/[A-Z]/, 'The password must contain at least one uppercase letter')
                        .matches(/\d/, 'The password must contain at least one number')
                        .matches(/[.#@$!%*?&]/, 'The password must contain at least one special character')
                    })}
                    onSubmit={(values) => handleValueForm(values)}
                    >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View style={stylesUserForm.form}>
                            <TextInput
                                label="Email"
                                placeholder="Email"
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                error={touched.email && errors.email}
                                />
                            <HelperText type="error" visible={touched.email && errors.email}>
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
                            <HelperText type="error" visible={touched.password && errors.password}>
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
                            <HelperText type="error" visible={touched.user_name && errors.user_name}>
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
                            <HelperText type="error" visible={touched.last_name && errors.last_name}>
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
                            <HelperText type="error" visible={touched.first_name && errors.first_name}>
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
                                style={stylesUserForm.inPutHeight}
                            />
                            <HelperText type="error" visible={touched.bio && errors.bio}>
                                {errors.firstName}
                            </HelperText>

                            <TouchableOpacity style={stylesUserForm.submit} onPress={handleSubmit}>
                                <Text style={{ color: 'white', textAlign: 'center' }}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
                <View style={stylesUserForm.blankZone}></View>
            </ScrollView>
        </View>
    )
}