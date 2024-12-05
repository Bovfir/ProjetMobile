import {Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import styles from '../styles/stylesUserForm';
import { TextInput, HelperText } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Header } from '../components/Header';


export default function UserForm(){

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
                    initialValues={{email:"ced.denoncinc", password:"sdfghjkl",lastName:"qsdfghj", firstName:"qsdfgh", pseudo:"dfgh", bio:"ghfdsqqcxedszfzef"}}
                    validationSchema={Yup.object({
                        email:Yup.string().email('Invalid email').required('Required'),
                        password: Yup.string().min(6, 'Must be at least 6 character').required('Required'),
                        lastName: Yup.string().max(25, 'Must be max 25 character'),
                        firstName: Yup.string().max(25, 'Must be max 25 character'),
                        pseudo: Yup.string().max(10, 'Must be max 10 character').required('Required'),
                        bio: Yup.string().max(100, 'Must be max 100 character' )
                    })}
                    onSubmit={(values) => console.log(values)}
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
                                onChangeText={handleChange('pseudo')}
                                onBlur={handleBlur('pseudo')}
                                value={values.pseudo}
                                error={touched.pseudo && errors.pseudo}
                                />
                            <HelperText
                                type="error"
                                visible={touched.pseudo && errors.pseudo}
                            >
                            {errors.pseudo}
                            </HelperText>
                            
                            <TextInput
                                label="Last name"
                                placeholder="Enter user name"
                                value={values.lastName}
                                error={touched.lastName && errors.lastName}
                                onChangeText={handleChange('lastName')}
                                onBlur={handleBlur('lastName')}
                            />
                            <HelperText
                                type="error"
                                visible={touched.lastName && errors.lastName}
                            >
                            {errors.lastName}
                            </HelperText>
                            
                            <TextInput
                                label='First name'
                                placeholder='Enter your last name'
                                value ={values.firstName}
                                error={touched.firstName && errors.firstName}
                                onChangeText={handleChange('firstName')}
                                onBlur={handleBlur('firstName')}
                            />
                            <HelperText
                                type="error"
                                visible={touched.firstName && errors.firstName}
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