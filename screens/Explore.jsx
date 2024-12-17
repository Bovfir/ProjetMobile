import { useState, useRef, useCallback, useEffect } from 'react';
import {Text, View, TextInput,TouchableOpacity,Animated, FlatList, TouchableWithoutFeedback, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Ionicons, FontAwesome5} from'@expo/vector-icons';
import {useFonts} from 'expo-font'
import axios from 'axios'
import styles from '../styles/styles'
import { Header } from '../components/Header';
import {CardEvent} from '../components/CardEvent';
import { styleCard } from '../styles/stylesCard';
import {Asset} from 'expo-asset';
import { Checkbox } from 'react-native-paper';
import * as APIConnection from '../API/getApi';

export default function Explore() {
    const navigation = useNavigation();
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [slideAnim] = useState(new Animated.Value(300));
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);



{/*-------------------temporaire--------------------- */}
    const MAXELEM = 3;
    const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    const loadAsset = async () => {
      const asset = Asset.fromModule(require('../assets/test.jpg'));
      await asset.downloadAsync(); // Précharge l'image
      setImageUri(asset.uri); // Met à jour l'état avec l'URI de l'image
    };
    loadAsset();
    fetchData();
  }, []);

    const fetchData = async () => {
        try{
            const events = await APIConnection.getEvent(1);
            const categoriesList = await APIConnection.getCategories();
            setData(events);
            setCategories(categoriesList);
        }catch(error){
          console.log("Error:")
          console.log(error)
        }
    }
    {/*---------------------------------------- */}

    const toggleFilter = (category) => {
        if (selectedFilters.includes(category)) {
          setSelectedFilters(selectedFilters.filter((item) => item !== category));
        } else {
          setSelectedFilters([...selectedFilters, category]);
        }
      };
      const openModal = () => {
        setModalVisible(true);
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      };
    
      const closeModal = () => {
        Animated.timing(slideAnim, {
          toValue: 300,
          duration: 300,
          useNativeDriver: true,
        }).start(() => setModalVisible(false));
      };

      const handleOutsideClick = (e) => {
        if (e.target === e.currentTarget) {
          closeModal();
        }
      };
  
      const filteredData = data.filter((item) => {
        const matchesFilter = selectedFilters.length > 0
          ? selectedFilters.includes(item.category_id)
          : true;
        return matchesFilter;
      });
      
    const [fontsLoaded] = useFonts({
        'BrunoAceSC': require('../assets/fonts/BrunoAceSC-Regular.ttf')
    })

    if (!fontsLoaded) {
    return <Text>Loading...</Text>;
    }
  
    async function getSearch(e){
        try{
            const response = await APIConnection.searchEvent({search: e.nativeEvent.text,page :1})
            setData(response)
        }catch(err){
            console.log(err);
        }
    }

    return (
            <View style={styles.container}>
{/*-------------------------Header----------------------*/}
          <Header title={'Explore'} notificationButton={true} backButton={true}/>
{/*-------------------------Search Bar--------------------*/}
            <View style={styles.headerSearchBarMargin}>
                <View style={styles.searchBarView}>
                    <TextInput
                        style={styles.input}
                        placeholder="Recherche événement"
                        onSubmitEditing={getSearch}
                    />
                    <TouchableOpacity style={styles.searchBarButton}>
                        <Ionicons name="filter" style={styles.iconStyle} onPress={openModal}/>
                    </TouchableOpacity>
                </View>
            </View>
{/*-------------------------Simulation liste d'event---------------*/}
      {filteredData?.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatListBox}
            data={filteredData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CardEvent
                key={item.id}
                card={item}
                isSelected={{}}
                toggleSlection={()=>{}}
                style={styleCard}
              />
            )}
        />
          ) :
          <View style={styles.emptyListBox}>
            <View style={styles.emptyListImageBox}>
              <Image source={require('../assets/nothingFound.png')} style={styles.image}/>
            </View>
          </View>
          }
{/*---------------------------Modal----------------------*/}
  {modalVisible && (
    <TouchableWithoutFeedback onPress={handleOutsideClick}>
          <Animated.View style={[styles.modalOverlay, { transform: [{ translateY: slideAnim }] }]}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Sélectionner les catégories</Text>
              <View style={styles.modalOptionBox}>
              {categories.map((category) => (
                <View key={category.id} style={styles.modalOption}>
                  <Text style={styles.modalOptionText}>{category.title}</Text>
                  <Checkbox
                    status={selectedFilters.includes(category.id) ? "checked" : "unchecked"}
                    onPress={() => toggleFilter(category.id)}
                    style={styles.checkBox}
                  />
              </View>
              ))}
              </View>
              <TouchableOpacity style={styles.closeModalButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>Fermer</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
          </TouchableWithoutFeedback>
        )}
      </View>
    );
  }
  