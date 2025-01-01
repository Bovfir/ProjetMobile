import { useState, useEffect } from 'react';
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
    const [data, setData] = useState([]);
    const [nbSubscribed,setNbSubscribed] = useState({});    
    const [ratio, setRatio] = useState({});
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
      const categoriesList = await APIConnection.getAllCategories();

      
      setCategories(categoriesList);
      setData((data) =>{
        const updatedData = [...data, ...response.events];
        return updatedData;
      });
      setNbRows(response.nbRows);
      setPage((page) => page + 1);

      const nbSubscribedForEachEventForYouPromises = data.map(async (item) => {
          const response = await APIConnection.getNbSubscribers(item.id);
          return {id: item.id, subscribers: Number(response.count)}; 
      });

      const ratioUpComingEventsPromises = data.map(async (item) => {
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
            {data?.length > 0 ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={stylesExplore.flatListBox}
              data={data}
              keyExtractor={(item, index) => item.id || index}
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
              {categories.map((category) => (
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
  