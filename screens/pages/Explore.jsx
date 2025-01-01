import { useState, useEffect, useRef } from 'react';
import {Text, View, TextInput,TouchableOpacity,Animated, FlatList, TouchableWithoutFeedback, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Ionicons} from'@expo/vector-icons';
import {stylesExplore} from '../../styles/stylesExplore'
import { Header } from '../../components/Header';
import {CardEvent} from '../../components/CardEvent';
import { styleCard } from '../../styles/stylesCard';
import { Checkbox } from 'react-native-paper';
import * as APIConnection from '../../API/index';

export default function Explore() {
    const navigation = useNavigation();
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [slideAnim] = useState(new Animated.Value(300));
    const [nbSubscribed,setNbSubscribed] = useState({});    
    const [ratio, setRatio] = useState({});
    const [refreshing, setRefreshing] = useState(false);
    const [search,setSearch] = useState("");
    const categories = useRef([]);

    const nbRows = useRef(6);
    const page = useRef(1);
    const data = useRef([]);

    const [noMore, setNoMore] = useState(false);
    const [reset, setReset] = useState(false);
    const perPage = 5;

    useEffect(() => {
      if (reset) {
        fetchDataPaging();
        setReset(false);
      }
    }, [reset]);

    useEffect(()=>{
      if(!modalVisible){
        fetchDataPaging();
      }
    }, [modalVisible])

    const resetPaging = () => {
      page.current = 1;
      data.current = [];
      nbRows.current = 6;
      setReset(true);
    }

    const handleSearch = () =>{
      resetPaging();
    }

    const getNbTotalPage = () => {
      return Math.ceil(nbRows.current/perPage)
    }

    const fetchDataPaging = async ()=>{
      if(page.current <= getNbTotalPage()){
      const response = await APIConnection.getDataBySearchAndCategories(page.current,selectedFilters,search);
      const categoriesList = await APIConnection.getAllCategories();
      categories.current = categoriesList
      data.current = [...data.current, ...response.events];

      nbRows.current = response.nbRows;
      page.current += 1;

      const nbSubscribedForEachEventForYouPromises = data.current.map(async (item) => {
          const response = await APIConnection.getNbSubscribers(item.id);
          return {id: item.id, subscribers: Number(response.count)}; 
      });

      const ratioUpComingEventsPromises = data.current.map(async (item) => {
          const response = await APIConnection.ratioEvent(item.id);
          return {id: item.id, ratio : response};
      });

      setRatio(await Promise.all(ratioUpComingEventsPromises));
      setNbSubscribed(await Promise.all(nbSubscribedForEachEventForYouPromises));
      }else{
        setNoMore(true);
      }
    }


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
      }).start(() => closeModalManager());
    };

    const closeModalManager = () => {
      page.current = 1;
      data.current = [];
      nbRows.current = 6;
      setModalVisible(false);
    }

    const handleOutsideClick = (e) => {
      if (e.target === e.currentTarget) {
        closeModal();
      }
    };

    const handleRefresh = () => {
      setRefreshing(true);
      resetPaging()
      setRefreshing(false);
    };
      
    return (
            <View style={stylesExplore.container}>
{/*-------------------------Header----------------------*/}
          <Header title={'Explore'} subTitle={'Where event come to life'} notificationButton={true} navigation={navigation}/>
{/*-------------------------Search Bar--------------------*/}
            <View style={stylesExplore.headerSearchBarMargin}>
                <View style={stylesExplore.searchBarView}>
                    <TextInput
                        style={stylesExplore.input}
                        placeholder="Recherche événement"
                        onChangeText={text => setSearch(text)}
                        onSubmitEditing={handleSearch}
                        value={search}
                    />
                    <TouchableOpacity style={stylesExplore.searchBarButton}>
                        <Ionicons name="filter" style={stylesExplore.iconStyle} onPress={openModal}/>
                    </TouchableOpacity>
                </View>
            </View>
            {/*-------------------------Simulation liste d'event---------------*/}
            {data.current?.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={stylesExplore.flatListBox}
              refreshing={refreshing}
              data={data.current}
              keyExtractor={(item, index) => item.id || index}
              onRefresh={handleRefresh}
              onEndReached={fetchDataPaging}
              onEndReachedThreshold={0.5}
              renderItem={({ item,index }) => {
                const subscribersCount = nbSubscribed[index]?.subscribers || 0; 
                const ratioEvent = ratio[index]?.ratio ? ratio[item.id].ratio * 5 : 0;  

                return (
                  <CardEvent
                    card={item}
                    nbSubscribed={subscribersCount}
                    isSelected={true} 
                    toggleSelection={() => {}} 
                    style={styleCard}
                    ratio={ratioEvent}
                  />
                );
              }}
            />

          ) :
          <View style={stylesExplore.emptyListBox}>
            <View style={stylesExplore.emptyListImageBox}>
              <Image source={require('../../assets/images/utils/NothingFound.png')} style={stylesExplore.image}/>
            </View>
          </View>
          }
{/*---------------------------Modal----------------------*/}
  {modalVisible && (
    <TouchableWithoutFeedback onPress={handleOutsideClick}>
          <Animated.View style={[stylesExplore.modalOverlay, { transform: [{ translateY: slideAnim }] }]}>
            <View style={stylesExplore.modalContainer}>
              <Text style={stylesExplore.modalTitle}>Sélectionner les catégories</Text>
              <View style={stylesExplore.modalOptionBox}>
              {categories.current.map((category) => (
                <View key={category.id} style={stylesExplore.modalOption}>
                  <Text style={stylesExplore.modalOptionText}>{category.title}</Text>
                  <Checkbox
                    status={selectedFilters.includes(category.id) ? "checked" : "unchecked"}
                    onPress={() => toggleFilter(category.id)}
                    style={stylesExplore.checkBox}
                  />
              </View>
              ))}
              </View>
              <TouchableOpacity style={stylesExplore.closeModalButton} onPress={closeModal}>
                <Text style={stylesExplore.closeButtonText}>Fermer</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
          </TouchableWithoutFeedback>
        )}
      </View>
    );
  }
  