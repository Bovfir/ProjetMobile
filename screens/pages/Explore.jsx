import { useState, useEffect,useCallback } from 'react';
import { Text, View, TextInput, TouchableOpacity, Animated, FlatList, TouchableWithoutFeedback, Image, ScrollView, RefreshControl } from 'react-native';
import { useNavigation,useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { stylesExplore } from '../../styles/stylesExplore';
import Header from '../../components/Header';
import CardEvent from '../../components/CardEvent';
import { styleCard } from '../../styles/stylesCard';
import { Checkbox } from 'react-native-paper';
import * as APIConnection from '../../API/index';
import { showToast } from '../../utils/utils';

export default function Explore() {
  const navigation = useNavigation();
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(300));
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState([]); 
  const [noMore, setNoMore] = useState(false);
  const [reset, setReset] = useState(false);
  
  const [nbRows, setNbRows] = useState(6); 
  const [page, setPage] = useState(1); 
  const perPage = 5;
  
  useFocusEffect(
      useCallback(() => {
          handleRefresh();
      }, [])
  );

  useEffect(() => {
    if (reset) {
      fetchDataPaging(1);
      setReset(false);
    }
  }, [reset]);

  useEffect(() => {
    if (!modalVisible) {
      fetchDataPaging(page);
    }
  }, [modalVisible]);

  const resetPaging = () => {
    setData([]); 
    setNbRows(6); 
    setPage(1); 
    fetchDataPaging(1); 
  };

  const handleSearch = () => {
    resetPaging();
  };

  const getNbTotalPage = () => {
    return Math.ceil(nbRows / perPage);
  };

  const fetchDataPaging = async (pageNew) => {
    try {
      if (pageNew <= getNbTotalPage()) {
        const response = await APIConnection.getDataBySearchAndCategories(pageNew, selectedFilters, search);
        const responseFollow = await APIConnection.searchLinkUserEvents(pageNew);
        const responseFavorite = await APIConnection.getFavorite(pageNew);
        const categoriesList = await APIConnection.getAllCategories();

        const updatedData = await Promise.all(
          response.events.map(async (event) => {
            const responseSubscribers = await APIConnection.getNbSubscribers(event.id);
            const responseRatio = await APIConnection.ratioEvent(event.id);

            return {
              ...event,
              isFavorite: responseFavorite.some((fav) => fav.event_id === event.id),
              isFollowed: responseFollow.some((follow) => follow.event_id === event.id),
              nbSubscribed: responseSubscribers.count || 0,
              ratio: Math.round(responseRatio * 5 * 100) / 100 || 0,
            };
          })
        );
        setCategories(categoriesList);
        setData((prevData) => [...prevData, ...updatedData]);
        setNbRows(response.nbRows);
        setPage(pageNew); 
      } else {
        setNoMore(true);
      }
    } catch (error) {
      showToast('error', 'Error data', 'An error has occurred. Please try later.');
      navigation.goBack();
    }
  };

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
    setData([]); 
    setNbRows(6); 
    setModalVisible(false);
  };

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleRefresh = () => {
    setRefreshing(true); 
    setData([]);
    setPage(1); 
    setNoMore(false); 
    fetchDataPaging(1); 
    setRefreshing(false); 
  };

  const handleNew = () => {
    if (!noMore) { 
      setRefreshing(true);
      fetchDataPaging(page + 1); 
      setRefreshing(false);
    }
  };
  const fetchSingleEvent = (eventId) => {
    // On met à jour un événement spécifique dans l'état data
    setData(prevData =>
      prevData.map(item =>
        item.id === eventId ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  return (
    <View style={stylesExplore.container}>
      {/*-------------------------Header----------------------*/}
      <Header title={'Explore'} subTitle={'Where event come to life'} notificationButton={true} navigation={navigation} />
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
            <Ionicons name="filter" style={stylesExplore.iconStyle} onPress={openModal} />
          </TouchableOpacity>
        </View>
      </View>
      {/*-------------------------Simulation liste d'event---------------*/}
      {data?.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={stylesExplore.flatListBox}
          refreshing={refreshing}
          data={data} 
          keyExtractor={(item, index) => `${item.id || index}-${index}`}
          onRefresh={handleRefresh} 
          onEndReached={handleNew}
          onEndReachedThreshold={0.5}
          renderItem={({ item }) => (
            <CardEvent
              card={item}
              nbSubscribed={item.nbSubscribed}
              isFollow={item.isFollowed}
              isFavorite={item.isFavorite}
              style={styleCard}
              ratio={item.ratio}
              fetchSingleEvent={fetchSingleEvent}
            />
          )}
        />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={true}
          style={{ flex: 1 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={['#4B0082']} />}
        >
          <View style={stylesExplore.emptyListBox}>
            <View style={stylesExplore.emptyListImageBox}>
              <Image source={require('../../assets/images/utils/NothingFound.png')} style={stylesExplore.image} />
            </View>
          </View>
        </ScrollView>
      )}
      {/*---------------------------Modal----------------------*/}
      {modalVisible && (
        <TouchableWithoutFeedback onPress={handleOutsideClick}>
          <Animated.View style={[stylesExplore.modalOverlay, { transform: [{ translateY: slideAnim }] }]} >
            <View style={stylesExplore.modalContainer}>
              <Text style={stylesExplore.modalTitle}>Sélectionner les catégories</Text>
              <View style={stylesExplore.modalOptionBox}>
                {categories.map((category) => (
                  <View key={category.id} style={stylesExplore.modalOption}>
                    <Text style={stylesExplore.modalOptionText}>{category.title}</Text>
                    <Checkbox
                      status={selectedFilters.includes(category.id) ? 'checked' : 'unchecked'}
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
