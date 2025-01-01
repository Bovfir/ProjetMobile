import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Profile from '../pages/Profile'
import UserForm from "../pages/UserForm";
import Notifications from "../pages/Notifications";

const Stack = createNativeStackNavigator();

export default function ProfileNavigation(){
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>

            <Stack.Screen options={{ unmountOnBlur: true}} name="ProfileMain" component={Profile}/>
            <Stack.Screen options={{ unmountOnBlur: true }} name="UserForm" component={UserForm}/>
            <Stack.Screen options={{ unmountOnBlur: true }} name="Notifications" component={Notifications}/>
            
        </Stack.Navigator>
    )
}