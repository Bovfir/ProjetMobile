import { CardTitle } from "@rneui/base/dist/Card/Card.Title";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF'
    },
    scrollView:{
      margin:'5%',
      marginTop:0
    },
    card: {
        height:100,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderWidth: 0.5,
        borderRadius:10,
        borderColor:'#4B0082',
        margin:'2%',
        elevation:5,
        overflow:'hidden',
        backgroundColor:'white'
      },
      cardCoverContainer: {
        height: '80%', 
        aspectRatio: 1, 
      },
      cardCover: {
        flex: 1,
        borderRadius: 8,
      },
      cardTextContainer: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center',
      },
      cardTitle: {
        color: '#4B0082',
        fontSize: 16,
        marginBottom: 5,
      },
      cardSubtitle: {
        fontSize: 14,
        color: 'gray',
      },
      messageTitle:{
        color:'#4B0082'
      },
      segmentedButton:{
        margin:'5%',
      },
      flatListContainer:{
        margin:'5%'
      },




      buttonBox:{
        flexDirection:'row',
        justifyContent:'center',
      },
      button:{
        marginRight:5
      }


})
export default styles;