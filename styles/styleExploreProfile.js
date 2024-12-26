import { StyleSheet } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#FFFFFF'
      },
    headerSearchBarMargin:{
        margin:'4%',
        marginBottom:0,
    },
    headerProfile:{
        height:70,
        margin:'4%',
        marginTop:40,
    },
    header:{
        height:40,
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:'25%',
    },
    titleHeader:{
        flex:6,
        color: '#4B0082',
        textAlign:'center',
        fontSize:30,
        fontFamily: 'BrunoAceSC-Regular'
    },
    backIcon:{
        fontSize: 30,
        textAlign:'center',
    },
    emptySpaceHeader:{
        flex:1,
    },
    text: {
        flex:1,
        color: '#4B0082',
        textAlign:'center',
        textAlignVertical:'center'
    },
    buttonHeader: {
        flex:1,
        padding:'5',
        justifyContent: 'center',
        alignContent:'center',
        borderWidth:1,
        borderColor:'#4B0082',
        borderRadius: 75,
    },
    input: {
        flex:6,
        padding:5,
        marginLeft:10
      },
    searchBarView:{
        height:40,
        flexDirection:'row',
        marginBottom:'10%',
        borderWidth: 1,
        borderColor:'#4B0082',
        borderRadius:20,
        alignItems: 'center'
    },
    searchBarButton:{
        flex:1,
    },
    scrollZone:{
        flex:1
    },
    iconStyle:{
        fontSize:25,
    },

    profileNameImage:{
        flex:3,
        margin:'5%',
        justifyContent: 'center',
        alignItems:'center',
        position: 'relative',
    },
    optionBox:{
        position: 'absolute',
        width:30,
        aspectRatio:1,
        top: 10,
        left: 10,
    },
    optionIcon:{
        fontSize:30
    },
    boxImage:{
        flex:1,
        aspectRatio:1,
        borderWidth:1,
        borderRadius:9999,
        overflow: 'hidden',
        elevation:50,
    },
    image:{
        width:'100%',
        height:'100%',
        resizeMode: 'cover'
    },
    boxNamePeudo:{
        flex:3,
    },
    textNameProfile:{
        textAlign:'center',
        fontSize: RFPercentage(3)
    },
    textPseudoProfile:{
        textAlign:'center',
        fontSize: RFPercentage(1.8),
    },
    counterLine:{
        marginTop:10,
        marginBottom:5,
        width: '100%',
        height:2,
        backgroundColor:'#4B0082',
        borderRadius:2
    },
    counterLineBottom:{
        marginTop:5,
        width: '100%',
        height:2,
        backgroundColor:'#4B0082',
        borderRadius:2
    },
    boxCounter:{
        flex:0,
        flexDirection:'row',
    },
    boxCounterSeparation:{
        width:2,
        height:'80%',
        alignSelf: 'center',
        backgroundColor:'#4B0082',
        borderRadius:2
    },
    textCounter:{
        textAlign:'center',
        fontSize: RFPercentage(1.8),
    },
    counter:{
        flex:1,
    },


    boxButton:{
        flex:0,
        flexDirection:'row',
        marginLeft:'5%',
        marginRight:'5%',

    },
    profileButton:{
        flex:2,
        flexDirection:'row',
        borderWidth:1,
        borderColor:'#4B0082',
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        padding:'2%',
    },
    profileButtonIcon:{
        fontSize:RFPercentage(2),
        padding:'2%'
    },
    emptySpaceButton:{
        flex:1,
    },
    boxDescirption:{
        flex:1,
        borderWidth:1,
        borderColor: '#4B0082',
        borderRadius: 10,
        margin:'5%',
        padding: 5,
        justifyContent:'center'
    },
    descriptionTitle:{
        fontSize: RFPercentage(3),
        color:'#4B0082',
        marginLeft:'5%',
        marginRight:'5%',
        marginTop:'5%'
    },

    flatListBox:{
        margin:'5%',
    },
    emptyListBox:{
        flex:1,
        alignItems:'center'

    },
    emptyListImageBox:{
        width:300,
        aspectRatio:1,
        overflow:'hidden',
        alignItems:'center',
        justifyContent:'center',
    },
    imgNothingFound:{
        width:'100%',
        height:'100%',
        resizeMode:'cover'
    },


    

    modalOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        backgroundColor: 'transparent', 
        alignItems:'center',
      },
      modalContainer: {
        width:'100%',
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        borderColor:'#4B0082',
        borderWidth:0.5
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign:'center',
        marginBottom:16
      },
      closeModalButton: {
        marginTop: 20,
        backgroundColor: '#4B0082',
        padding: 10,
        borderRadius: 5,
        width:'50%',
        marginLeft:'25%'
      },
      closeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign:'center'
      },
      modalOptionBox:{
        alignItems:'left'
      },
      modalOption:{
        flexDirection:'row',
        width:'100%',
        borderColor:'#4B0082',
      },
      modalOptionText:{
        width:'90%'
      },
      modalOptionSelected:{
        backgroundColor:'rgba(75, 0, 130, 0.5)',
      },
      checkBox:{
        color:'red'
      },
      noMore:{
        textAlign:'center',
        color: '#4B0082',
        margin:5
      },

      modalButton:{
        margin:4,
        borderColor:'red',
        borderWidth:1,
      },
  });
  export default styles;