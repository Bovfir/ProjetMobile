import { Text, View, FlatList} from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from '../styles/stylesNotif';
import {Ionicons } from '@expo/vector-icons';
import {Notification} from '../components/Notification'
import { Invitation } from '../components/Invitations';
import { Header } from '../components/Header';
import { SegmentedButtons } from 'react-native-paper';
import * as APIConnection from '../API/getApi';

export default function  Notifications(){
    const [selected, setSelected] = useState('first');
    const [data, setData] = useState([]);
    const [nbRows, setNbRows] = useState(1);
    const [refreshing, setRefreshing] = useState(false);
    const [page, setPage] = useState(1);
    const [reset, setReset] = useState(false);
 
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
        console.error("Erreur lors du rafraîchissement :", error);
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
        if(page === 1){
            const response = await APIConnection.getInvitation(page);
            setData(response.invitation)
            setNbRows(response.nbRows);
        }else if(page <= getNbTotalPage()){
            const response = await APIConnection.getInvitation(page);
            setData((data) => [...data,...response.invitation]);
            setNbRows(response.nbRows);
        }
    }
    const getNotification = async () =>{
        if(page === 1){
            const response = await APIConnection.getNotification(page);
            setData(response.notification)
            setNbRows(response.nbRows);
        }else if(page <= getNbTotalPage()){
            const response = await APIConnection.getNotification(page);
            setData((data) => [...data,...response.invitation]);
            setNbRows(response.nbRows);
        }
    }

    const renderItem = ({ item }) => {
        if (selected === "first") {
          return <Notification key={item.id} item={item} />;
        }
        return <Invitation key={item.id} item={item} />;
      };
    
      return (
        <View style={styles.container}>
          <Header title={"Notifications"} backButton={true} titleSize={27} />
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
            style={styles.segmentedButton}
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
              contentContainerStyle={styles.flatListContainer}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <Text style={styles.emptyText}>Rien à afficher</Text>
          )}
        </View>
      );
    };