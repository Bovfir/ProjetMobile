import { StyleSheet, Text, View } from 'react-native';


export default function Home(){
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