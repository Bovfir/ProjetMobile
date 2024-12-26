import { useState, useRef, useCallback, useEffect } from 'react';
import {Text, View, TextInput,TouchableOpacity,Animated, FlatList, TouchableWithoutFeedback, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Ionicons, FontAwesome5} from'@expo/vector-icons';
import {useFonts} from 'expo-font'
import axios from 'axios'
import styles from '../styles/styleExploreProfile'
import { Header } from '../components/Header';
import {CardEvent} from '../components/CardEvent';
import { styleCard } from '../styles/stylesCard';
import { Checkbox } from 'react-native-paper';
import * as APIConnection from '../API/getApi';

export default function Explore() {
    const navigation = useNavigation();
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [slideAnim] = useState(new Animated.Value(300));
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");
    const [nbRows, setNbRows] = useState(6);
    const [page, setPage] = useState(1);
    const [noMore, setNoMore] = useState(false);
    const [reset, setReset] = useState(false);
    const perPage = 5;


    useEffect(() => {
      fetchDataPaging()
    }, []);

    useEffect(() => {
      if (reset) {
        fetchDataPaging();
        setReset(false);
      }
    }, [reset]);

    const resetPaging = () => {
      setPage(1);
      setData([]);
      setNbRows(6);
      setReset(true);
    }

    const handleSearch = () =>{
      resetPaging();
    }

    const getNbTotalPage = () => {
      return Math.ceil(nbRows/perPage)
    }

    const fetchDataPaging = async ()=>{
      if(page <= getNbTotalPage()){
      const response = await APIConnection.getDataBySearchAndCategories(page,selectedFilters,search);
      const categoriesList = await APIConnection.getCategories();
      setCategories(categoriesList);
      setData((data) =>{
        const updatedData = [...data, ...response.events];
        return updatedData;
      });
      setNbRows(response.nbRows);
      setPage((page) => page + 1);
      }else{
        setNoMore(true);
      }
    }


    const toggleFilter = (category) => {
        if (selectedFilters.includes(category)) {
          setSelectedFilters(selectedFilters.filter((item) => item !== category));
          resetPaging();
        } else {
          setSelectedFilters([...selectedFilters, category]);
          resetPaging();
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
  
    const [fontsLoaded] = useFonts({
        'BrunoAceSC': require('../assets/fonts/BrunoAceSC-Regular.ttf')
    })
    return (
            <View style={styles.container}>
{/*-------------------------Header----------------------*/}
          <Header title={'Explore'} subTitle={'Where event come to live'} notificationButton={true}/>
{/*-------------------------Search Bar--------------------*/}
            <View style={styles.headerSearchBarMargin}>
                <View style={styles.searchBarView}>
                    <TextInput
                        style={styles.input}
                        placeholder="Recherche événement"
                        onChangeText={text => setSearch(text)}
                        onSubmitEditing={handleSearch}
                        value={search}
                    />
                    <TouchableOpacity style={styles.searchBarButton}>
                        <Ionicons name="filter" style={styles.iconStyle} onPress={openModal}/>
                    </TouchableOpacity>
                </View>
            </View>
{/*-------------------------Simulation liste d'event---------------*/}
      {data?.length > 0 ? (
        <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.flatListBox}
            data={data}
            keyExtractor={(item,index) => item.id || index}
            onEndReached={fetchDataPaging}
            onEndReachedThreshold={0.5}
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
  