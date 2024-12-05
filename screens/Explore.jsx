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

export default function Explore() {
    const navigation = useNavigation();
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [slideAnim] = useState(new Animated.Value(300));



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
  }, []);
    const cards = Array.from({ length: MAXELEM }, (_, index) => ({
      id: index,
      title: `Event ${index + 1}`,
      description: `Description for event ${index + 1}`,
      image: imageUri,
      rate: (Math.random() * 2 + 3).toFixed(1),
      nbUsers: Math.floor(Math.random() * 2000) + 1,
      categoryId: index == 2 ? '2' : "1"
  }));
    const categories = [
        { id: '1', name: 'Music' },
        { id: '2', name: 'Technology' },
        { id: '3', name: 'Film' },
        { id: '4', name: 'Pop Culture' },
    ];
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
    
      const filteredData = cards.filter((item) => {
        const matchesFilter = selectedFilters.length
          ? selectedFilters.includes(item.categoryId)
          : true;
        return matchesFilter;
      });



    const [fontsLoaded] = useFonts({
        'BrunoAceSC': require('../assets/fonts/BrunoAceSC-Regular.ttf')
    })

    if (!fontsLoaded) {
    return <Text>Loading...</Text>;
    }
    const urlBasics =  'http://192.168.185.200:3040/event/search/general/'
    async function getSearch(e){
        try{
            let finalUrl = urlBasics + e.nativeEvent.text;
            console.log(finalUrl);
            const response = await axios.get(finalUrl);
            console.log(response.data);
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
                <Text style={styles.modalOptionText}>{category.name}</Text>
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
  