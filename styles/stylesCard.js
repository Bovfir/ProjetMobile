import { StyleSheet} from 'react-native';

export const styleCard = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 30
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
    textBox: {
        width: '70%',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'transparent',
    },
    textBoxSearch: {
        width: '85%',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F0F0F0',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginTop: 10,
        position: 'relative',
    },
    textInput:{
        height: 40,
        paddingLeft: 10,
        fontSize: 16,
        color:'black',
    },
    buttonContainer: {
        position: 'absolute',
        right: 10,  
        top: '50%',  
        transform: [{ translateY: -20 }],  
        marginTop: 5
    },
    buttonStyle: {
        backgroundColor: '#4B0082',
        borderRadius: 5, 
        paddingVertical: 5,
    },
    locationContainer: {
        flexDirection: 'row', 
        alignItems: 'flex-start', 
        width: '80%',
        marginTop: 15,
        marginBottom:10
    },
    locationBoxText: {
        flexDirection: 'column',
    },
    locationTextCity: {
        color: '#4B0082',
        fontFamily: 'Inter',
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 20,
        textAlign: 'left',
    },
    locationTextBottom: {
        color: '#4B0082',
        fontFamily: 'Inter',
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 20,
        textAlign: 'left',
    },
    categoryTitleContainer:{
        flexDirection: 'row', 
        alignItems: 'flex-start', 
        width: '80%',
        marginTop: 0,
    },
    categoryText: {
        color: 'black',
        width:'80%',
        fontFamily: 'Inter',
        fontWeight: '700',
        fontSize: 16,
    },
    scrollCategory: {
        height:80,
        marginTop:10, 
        marginLeft:20,
        marginRight:5,
        marginBottom: 10,
    },
    categoryCard: {
        width: 73, 
        height: 73, 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: 5,
        marginRight:10,
        marginLeft:1
    },
    scrollContainer: {
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 20,
    },
    cardStyle: {
        height:200,
        backgroundColor: '#FFFFFF',
        marginBottom:20
    },
    cardCover: {
        height: '50%',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    cardContent: {
        height: '50%',
        alignItems: 'right',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    cardContentView: {
        width: 120,
        height: 18.575,
        flexShrink: 0,
        marginTop: 5
    },
    cardContentTitle: {
        color: 'black', 
        fontFamily: 'Inter', 
        fontSize: 16, 
        fontWeight: '700', 
        lineHeight: 20, 
        textAlign: 'left',
    },
    cardLocationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    locationIcon : {
        marginRight: 5,
    },
    cardContentLocation: {
        color: '#878787',
        fontFamily: 'Inter',
        fontSize: 12,
        fontWeight: 400,
        textAlign: 'left'
    },
    iconCardLeft: {
        position: 'absolute',
        top: 10,  // Distance depuis le haut
        left: 10, // Distance depuis la gauche
        width: 25, // Largeur du rectangle
        height: 25, // Hauteur du rectangle
        backgroundColor: '#4B0082', // Couleur du rectangle (par exemple rouge-tomate)
        borderRadius: 5, // Coins arrondis (optionnel)
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1, // Assurez-vous qu'il soit visible au-dessus
    },
    iconCardRight: {
        position: 'absolute',
        top: 3,
        right: 5,
        width: 30,
        height: 30,
        backgroundColor: '#FFFFFF',
        borderRadius : 20,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10
    },
    cardDateBottom: {
        position: 'absolute',
        top: 55, // Position verticale
        left: 10, // Position horizontale
        width: 32, // Largeur de la carte
        height: 32, // Hauteur de la carte
        backgroundColor: '#FFFFFF',
        borderRadius: 5, // Arrondir les bords
        justifyContent: 'center', // Centre le contenu verticalement
        alignItems: 'center', // Centre le contenu horizontalement
        zIndex: 1, // S'assurer qu'il reste au-dessus des autres éléments
    }, 
    cardDateText: {
        fontSize: 12,  // Ajuster la taille du texte
        fontWeight: 800,
        color: '#000', // Couleur du texte (vous pouvez la changer)
        textAlign: 'center', // S'assurer que le texte est centré
        marginTop: 0,
    },
}); 