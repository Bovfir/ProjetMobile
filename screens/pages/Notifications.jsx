import { View, FlatList, Image} from 'react-native';
import React, { useState, useEffect } from 'react';
import {stylesNotification} from '../../styles/stylesNotification';
import {Notification} from '../../components/Notification'
import { Invitation } from '../../components/Invitations';
import { Header } from '../../components/Header';
import { SegmentedButtons } from 'react-native-paper';
import * as API from '../../API/index';
import { useNavigation } from '@react-navigation/native';
import { showToast } from '../../utils/utils';

export default function  Notifications(){
    const [selected, setSelected] = useState('first');
    const [data, setData] = useState([]);
    const [nbRows, setNbRows] = useState(1);
    const [refreshing, setRefreshing] = useState(false);
    const [page, setPage] = useState(1);
    const [reset, setReset] = useState(false);
    const navigation = useNavigation();
 
    const perPageNotif = 7;
  
    const handleRefresh = () => {
      setRefreshing(true);
      resetPaging()
      try {
        if (selected === "first") {
            getNotification();
          }
          if (selected === "second") {
            getInvitation();
          }

      } catch (error) {
        showToast('error','Refresh error','Error while refreshing.');
      } finally {
        setRefreshing(false);
      }
    };

    const handlePaging = () =>{
        setPage((page) => page + 1);
    }

    useEffect(() => {
        if (reset) {
            if(selected === 'first'){
                getNotification();
            }else{
                getInvitation();
            }
            setReset(false);
        }
      }, [reset]);

      useEffect(()=>{
        resetPaging();
    },[selected])

    useEffect(()=>{
        if(selected === 'first'){
            getNotification();
        }else{
            getInvitation();
        }
    },[page])
  
      const resetPaging = () => {
        setPage(1);
        setData([]);
        setNbRows(6);
        setReset(true);
      }

    const getNbTotalPage = () => {
        return Math.ceil(nbRows/perPageNotif)
      }

    const getInvitation = async () =>{
      try {
        if(page === 1){
            const response = await API.getInvitation(page);
            setData(response.invitation)
            setNbRows(response.nbRows);
        }else if(page <= getNbTotalPage()){
            const response = await API.getInvitation(page);
            setData((data) => [...data,...response.invitation]);
            setNbRows(response.nbRows);
        }
      } catch (error) {
        showToast('error','Getting error','An error occurred while getting the invitation.');
      }
    }
    const getNotification = async () =>{
      try {
          if(page === 1){
              const response = await API.getNotification(page);
              setData(response.notification)
              setNbRows(response.nbRows);
          }else if(page <= getNbTotalPage()){
              const response = await API.getNotification(page);
              setData((data) => [...data,...response.invitation]);
              setNbRows(response.nbRows);
          }
      } catch (error) {
        showToast('error','Getting error','An error occurred while getting the notification.');
      }
    }

    const renderItem = ({ item }) => {
        if (selected === "first") {
          return <Notification key={item.id} item={item} />;
        }
        return <Invitation key={item.id} item={item}/>;
      };
    
      return (
        <View style={stylesNotification.container}>
          <Header title={"Notifications"} backButton={true} titleSize={27} navigation={navigation} />
          <SegmentedButtons
            value={selected}
            onValueChange={(value) => setSelected(value)}
            buttons={[
              {
                value: "first",
                label: "Notification",
              },
              {
                value: "second",
                label: "Invitation",
              },
            ]}
            style={stylesNotification.segmentedButton}
          />
          {data?.length > 0 ? (
            <FlatList
              data={data}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
              refreshing={refreshing}
               onRefresh={handleRefresh}
               onEndReached={handlePaging}
               onEndReachedThreshold={0.5}
              contentContainerStyle={stylesNotification.flatListContainer}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <Image source={require('../../assets/images/utils/NothingFound.png')} style={{width: 300, height: 300, marginTop: 100, alignSelf:'center' }} />
          )}
        </View>
      );
    };