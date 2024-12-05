import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Connection from '../screens/Connection'
import UserForm from "../screens/UserForm";
import Notifications from "../screens/Notifications";
import Profile from '../screens/Profile';

const Stack = createNativeStackNavigator();

export default function ConnexionNavigation(){
    return(
        <Stack.Navigator
        screenOptions={{
            headerShown: false,
          }}>
            <Stack.Screen name="Connection" component={Connection}/>
            <Stack.Screen name="UserForm" component={UserForm}/>
            <Stack.Screen name='Profile' component={Profile}/>
        </Stack.Navigator>
    )
}