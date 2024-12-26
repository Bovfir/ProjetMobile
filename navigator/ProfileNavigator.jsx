import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Profile from '../screens/Profile'
import UserForm from "../screens/UserForm";
import Notifications from "../screens/Notifications";
import Connection from "../screens/Connection";

const Stack = createNativeStackNavigator();

export default function ProfileNavigation(){
    return(
        <Stack.Navigator
        screenOptions={{
            headerShown: false,
          }}>
            <Stack.Screen name="ProfileNav" component={Profile}/>
            <Stack.Screen name="UserForm" component={UserForm}/>
            <Stack.Screen name="Notifications" component={Notifications}/>
            <Stack.Screen name="Connection" component={Connection}/>
        </Stack.Navigator>
    )
}