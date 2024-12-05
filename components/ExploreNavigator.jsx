import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Explore from '../screens/Explore'
import UserForm from "../screens/UserForm";
import Notifications from "../screens/Notifications";

const Stack = createNativeStackNavigator();

export default function ExploreNavigation(){
    return(
        <Stack.Navigator
        screenOptions={{
            headerShown: false,
          }}>
            <Stack.Screen name="ExploreHome" component={Explore}/>
            <Stack.Screen name="UserForm" component={UserForm}/>
            <Stack.Screen name="Notifications" component={Notifications}/>
        </Stack.Navigator>
    )
}