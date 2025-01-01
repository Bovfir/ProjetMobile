import { StyleSheet } from "react-native";


export const stylesDiscussionInfo = StyleSheet.create({
    cardStyle: {
        width: 320,
        height: 155,
        backgroundColor: '#FFFFFF',
        alignSelf: 'center',
        position: 'relative',  
        marginBottom: 20,
        borderRadius: 20,
        borderColor: '#820DD8',
        borderWidth: 1,
    },
    viewHoritonzalBar: {
        width: '100%',
        height: 1,
        backgroundColor: '#CECBCB',
        position: 'absolute',
        top: 100,
        alignSelf: 'center',
        marginBottom: 5
    },
    usersTitleWrapper: {
        position: 'absolute',   
        top: 10,               
        right: 30,              
        width: 'auto',          
    },
    usersTitle: {
        fontSize: 14,          
        fontWeight: 'bold',     
        color: '#333',          
        textAlign: 'right',     
    },
    titleWrapper: {
        width:200,
        marginBottom: 4,
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#333',
    },
    subtitleWrapper: {
        marginLeft: 4,
        width:180,
    },
    subtitle: {
        fontSize: 12,
        color: '#555',
    },
    usersCirclesWrapper: {
        flexDirection: 'row',
        position: 'absolute',     
        top: 35,                   
        right: 10,                 
    },
    userCircle: {
        width: 30,                
        height: 30,            
        borderRadius: 50,         
        backgroundColor: 'white',  
        marginLeft: -15,          
        overflow: 'hidden',      
        justifyContent: 'center', 
        alignItems: 'center',     
    },
    moreUsers: {
        width: 30,                
        height: 30,               
        borderRadius: 50,         
        backgroundColor: '#D3D3D3',  
        marginLeft: -15,          
        justifyContent: 'center', 
        alignItems: 'center',    
    },
    moreUsersText: {
        fontSize: 14,          
        color: '#fff',           
        fontWeight: 'bold',       
    },
    avatarImage: {
        width: 30,               
        height: 30,              
        borderRadius: 50,         
    },
    activityWrapper: {
        position: 'absolute',
        top: 75,
        right: 10, 
    },
    activityText: {
        fontSize: 12,
        color: '#555',
    },
    lastMessageWrapper: {
        position: 'absolute',
        top: 103,
        left: 15, 
    },
    lastMessageTitle: {
        fontSize: 12,
        color: '#555',
    },
    icons: {
        marginRight: 10,
    },
    lastMessageRow: {
        flexDirection: 'row', 
        justifyContent: 'flex-start',
        alignItems: 'center', 
        paddingLeft: 15, 
        position: 'absolute',
        top: 120, 
        left: 15, 
    },
    lastMessageContentWrapper: {
        flex: 1, 
    },
    lastMessageText: {
        fontSize: 12,
        color: '#333',
        marginLeft: 10, 
    },
    lastMessagePlaceholderText: {
        fontSize: 12,
        color: '#aaa', 
        fontStyle: 'italic',
    },
    userCircleRight: {
        width: 30,                
        height: 30,            
        borderRadius: 50,         
        backgroundColor: 'white',  
        marginLeft: 0, 
        overflow: 'hidden',      
        justifyContent: 'center', 
        alignItems: 'center',     
    }
});
