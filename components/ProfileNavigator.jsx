import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Profile from '../screens/Profile'
import UserForm from "../screens/UserForm";
import Notifications from "../screens/Notifications";

const Stack = createNativeStackNavigator();

export default function ExploreNavigation(){
    return(
        <Stack.Navigator
        screenOptions={{
            headerShown: false,
          }}>
            <Stack.Screen name="ProfileHome" component={Profile}/>
            <Stack.Screen name="UserForm" component={UserForm}/>
            <Stack.Screen name="Notifications" component={Notifications}/>
        </Stack.Navigator>
    )
}