import { StyleSheet, Text, View } from 'react-native';

export default function Home(){

    return(
        <>
        <View style={style.container}>
            <View style={style.textBox}>
                <Text style={style.title}>EventFlow</Text>
                <Text style={style.slogan}>Where event come to life</Text>
            </View>
        </View>
        </>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'FFFFFF',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 30
    },
    textBox: {
        width: '70%',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'transparent',
    },
    title: {
      fontSize: 30,
      color: '#4B0082',
      fontFamily: 'BrunoAceSC'
    },
    slogan: {
        fontSize: 12,
        color: 'black',
        fontFamily: 'BrunoAceSC',
    },
}); 