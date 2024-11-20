import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';


export default function home(){
    const [fontLoaded, setFonsLoaded] = useState(false);

    useEffect(() => {
        async function loadFonts() {
            await Font.loadAsync({
                'BrunoAceSC': require('./assets/fonts/BrunoAceSC-Regular.ttf'),
            });
            setFonsLoaded(true);
        }
        loadFonts();
    }, []);

    if(!fontLoaded){
        return null;
    }


    return(
        <>
        <View style={style.container}>
            <Text style={style.title}>EventFlow</Text>
        </View>
        </>
    )
}


const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
      fontSize: 24,
      color: '4B0082',
      fontWeight: 'Regular',
      fontFamily: 'BrunoAceSC,'
    },
}); 