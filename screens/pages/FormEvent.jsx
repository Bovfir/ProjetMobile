import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Pressable, RefreshControl } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { styleFormEvent } from '../../styles/stylesFormEvent';
import { useNavigation, useRoute } from '@react-navigation/native';
import PublicPrivateSelector from '../../components/PublicPrivateSelector';
import CreateEventButton from '../../components/CreateEventButton';
import TitleFormField from '../../components/TitleFormField';
import CardCategoryForm from '../../components/CardCategoryForm';
import DateTimeSelector from '../../components/DateTimeSelector';
import TextInputForm from '../../components/TextInputForm'
import { Header } from '../../components/Header';
import InvitationInput from '../../components/InvitationInput';
import HelperTextField from "../../components/HelperTextField";
import { showToast } from '../../utils/utils';
import { Formik } from 'formik';
import * as Yup from 'yup';
import EventImageSelector from '../../components/EventImageSelector';
import { uploadImage as APIUploadImage,checkInvitation} from '../../API/index';
import { fetchCategories, createEvent, updateEvent } from '../../actions/eventActions';
import { useDispatch, useSelector } from 'react-redux';
import { TextInput } from 'react-native-paper';


export default function FormEvent() {
    const [refreshing, setRefreshing] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [emailInput, setEmailInput] = useState('');
    const [emailList, setEmailList] = useState([]);
    const [showDescriptionInput, setShowDescriptionInput] = useState(false);
    const dispatch = useDispatch();
    const {categories, loading} = useSelector((state) => state.event);
    
    const route = useRoute();
    const {event,eventID,type, eventUpdated} = route.params || {};

    const navigation = useNavigation();

    const onRefresh = async () => {
        setRefreshing(true);
        dispatch(fetchCategories());
        if(type === 'update' && event.description){
            setShowDescriptionInput(true);
        }
        setRefreshing(false);
    };

    useEffect(() => {
        onRefresh();
    },[dispatch])


    useEffect(() => {
        if (categories.length > 0) {
            if(event) {
                setSelectedCategory(event.category_id);
            } else {
                setSelectedCategory(categories[0].id);
            }
        }
    }, [categories]);

    const validationSchema = Yup.object().shape({
        image: Yup.mixed().required('Event image is required'),
        nameEvent: Yup.string().required('Event name is required'),
        location: Yup.string().required('Event location is required'),
        description: Yup.string(),
        eventStart: Yup.date().required('Start date is required'),
        eventEnd: Yup.date().required('End date is required'),
    });
    const formikInitialValues = {
        image: event ? event.picture_path : null,
        nameEvent: event ? event.title : '',
        location: event ? event.street_number : '',
        description: event ? event.description : '',
        eventStart: event && event.event_start ? event.event_start.split(' ')[0] : new Date().toISOString().split('T')[0],
        eventEnd: event && event.event_end ? event.event_end.split(' ')[0] : new Date().toISOString().split('T')[0],
        timeStart: event && event.event_start 
            ? event.event_start.split(' ')[1].slice(0, 5) 
            : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timeEnd: event && event.event_end 
            ? event.event_end.split(' ')[1].slice(0, 5) 
            : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        selectedType: event ? event.is_private : false,
        selectedCategory: selectedCategory || (categories.length ? categories[0].id : null),
    };
    
    

    const handleEventSubmit = async (values) => {
        try {
            const isUpdate = event && event.id; 
            let updatedData = {};

            const fieldsToCompare = [
                { key: 'nameEvent', field: 'title' },
                { key: 'description', field: 'description' },
                { key: 'location', field: 'street_number' },
                { key: 'selectedType', field: 'is_private' },
            ];

            fieldsToCompare.forEach(({ key, field, transform }) => {
                const newValue = values[key];
                const oldValue = event ? event[field] : null;
                const transformedValue = transform ? transform(newValue) : newValue;

                if (newValue !== oldValue) {
                    updatedData[field] = transformedValue;
                }
            });

            if (selectedImage && selectedImage !== event?.picture_path) {
                updatedData.picture_path = await APIUploadImage({ imageUri: selectedImage });
            }

            updatedData = {
                ...updatedData,
                category_id: selectedCategory,
                location_id: 1, 
                id: eventID,
                event_start: `${values.eventStart} ${values.timeStart}`,
                event_end: `${values.eventEnd} ${values.timeEnd}`
            };

            if (isUpdate) {
                dispatch(updateEvent(updatedData,emailList));
                showToast('success', 'Event updated successfully', 'Your event has been updated.');
            } else {
                dispatch(createEvent(updatedData, emailList));
                showToast('success', 'Event created successfully', 'Your event is now available.');
            }

            navigation.navigate('MyEventCreated',{eventUpdated: true});
    } catch (error) {
        if(error.status === 400){
            showToast('error',`Error : ${error.message}`,'Please upload an another value.');
        } else {
            showToast('error','Error','Something went wrong. Please try again later.');
        }
    }
    };
    
    const handleAddEmail = async () => {
        try {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (emailRegex.test(emailInput)) {
                let exist;
                if(type === 'update'){
                    exist = await checkInvitation({ email: emailInput.toLowerCase(), event_id: event.id });
                }
    
                if (exist) {
                    showToast('error', 'Email Exists', 'This email is already linked to the event.');
                } else if (!emailList.includes(emailInput.toLowerCase())) {
                    setEmailList([...emailList, emailInput.toLowerCase()]);
                    setEmailInput('');
                } else {
                    showToast('error', 'Duplicate Email', 'This email has already been added.');
                }
            } else {
                showToast('error', 'Invalid Email', 'The email format is incorrect.');
            }
        } catch (error) {
            if (error.status === 404) {
                if (!emailList.includes(emailInput.toLowerCase())) {
                    setEmailList([...emailList, emailInput.toLowerCase()]);
                    setEmailInput('');  
                } else {
                    showToast('error', 'Duplicate Email', 'This email has already been added.');
                }
            } else {
                showToast('error', 'Error', 'An error occurred while checking the email.');
            }
        }
    };

    const handleRemoveEmail = (email) => {
        setEmailList(emailList.filter((e) => e !== email));
    };

    return (
        <Formik initialValues={formikInitialValues} validationSchema={validationSchema} onSubmit={(values) => handleEventSubmit(values)}>
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue}) => (
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <Header title="Event Form" notificationButton={true} navigation={navigation} backButton={true} />
                    <ScrollView showsVerticalScrollIndicator={true} style={{ flex: 1 }}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#4B0082']} />}>
                        
                        <View style={styleFormEvent.viewCreateText}>
                            <Text style={styleFormEvent.createEvent}>Create Event</Text>
                        </View>

                        <EventImageSelector 
                            event={event}
                            selectedImage={selectedImage}
                            setSelectedImage={setSelectedImage}
                            setFieldValue={setFieldValue}
                            styles={styleFormEvent}
                        />

                        <HelperTextField touched={touched} errors={errors} fieldName={"image"} style={styleFormEvent.helpText}/>

                        <TitleFormField title="Event name" styles={styleFormEvent} />
                        <TextInputForm
                            value={values.nameEvent}
                            placeholder="Enter your event name..."
                            onChangeText={handleChange('nameEvent')}
                            onBlur={handleBlur('nameEvent')}
                            styles={styleFormEvent}
                        />
                        <HelperTextField touched={touched} errors={errors} fieldName={"nameEvent"} style={styleFormEvent.helpText}/>

                        <View style={styleFormEvent.containerName}>
                            <Pressable onPress={() => {setShowDescriptionInput(!showDescriptionInput); values.description = ''}} style={styleFormEvent.toggleDescriptionButton}>
                                <View style={styleFormEvent.row}>
                                    {showDescriptionInput ? (
                                        <>
                                            <AntDesign name="minus" size={16} color="#4B0082" style={{marginLeft: 30,}}/>
                                            <Text style={styleFormEvent.addDescription}>Remove Description</Text>
                                        </>
                                    ) : (
                                        <>
                                            <AntDesign name="plus" size={16} color="#4B0082" style={{marginLeft: 30,}}/>
                                            <Text style={styleFormEvent.addDescription}>Add Description</Text>
                                        </>
                                    )}
                                </View>
                            </Pressable>
                            {showDescriptionInput && (
                                <TextInputForm
                                    value={values.description}
                                    placeholder="Enter a description..."
                                    onChangeText={handleChange('description')}
                                    onBlur={handleBlur('description')}
                                    styles={styleFormEvent}
                                />
                            )}
                        </View>


                        <DateTimeSelector
                            eventStart={values.eventStart}
                            eventEnd={values.eventEnd}
                            timeStart={values.timeStart}
                            timeEnd={values.timeEnd}
                            onChangeEventStart={(date) => setFieldValue('eventStart', date)}
                            onChangeEventEnd={(date) => setFieldValue('eventEnd', date)}
                            onChangeTimeStart={(time) => setFieldValue('timeStart', time)}
                            onChangeTimeEnd={(time) => setFieldValue('timeEnd', time)}
                        />

                        <TitleFormField title="Location" styles={styleFormEvent} />
                        <TextInputForm
                            value={values.location}
                            placeholder="Enter your event location..."
                            onChangeText={handleChange('location')}
                            onBlur={handleBlur('location')}
                            type={'location'}
                            styles={styleFormEvent}
                        />

                        <HelperTextField touched={touched} errors={errors} fieldName={"location"} style={styleFormEvent.helpText}/>

                        <TitleFormField title="Category" styles={styleFormEvent} />
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styleFormEvent.scrollCategories} contentContainerStyle={{ alignItems: 'center', paddingHorizontal: 10 }}>
                            {categories.map((category) => (
                                <CardCategoryForm
                                    key={category.id}
                                    category={category}
                                    selectedCategory={selectedCategory}
                                    setSelectedCategory={setSelectedCategory}
                                    styles={styleFormEvent}
                                />
                            ))}
                        </ScrollView>

                        <TitleFormField title="Type" styles={styleFormEvent} />
                        <PublicPrivateSelector
                            selectedType={values.selectedType}
                            onSelectedType={(type) => setFieldValue('selectedType', type)}
                            styles={styleFormEvent}
                        />

                        {values.selectedType && (
                            <InvitationInput emailList={emailList} emailInput={emailInput} setEmailInput={setEmailInput} handleAddEmail={handleAddEmail} handleRemoveEmail={handleRemoveEmail} styles={styleFormEvent}/>
                        )}

                        <CreateEventButton onPress={handleSubmit} styles={styleFormEvent} event={event} />
                    </ScrollView>
                </View>
            )}
        </Formik>
    );
}
