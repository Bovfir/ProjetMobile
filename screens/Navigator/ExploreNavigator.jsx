import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Explore from '../pages/Explore'
import EventPresentation from '../pages/EventPresentation';
import UserForm from "../pages/UserForm";
import Notifications from "../pages/Notifications";
import Topics from "../pages/Topics";
import DiscussionChat from "../pages/DiscussionChat";

const Stack = createNativeStackNavigator();

export default function ExploreNavigation(){
    return(
        <Stack.Navigator screenOptions={{ headerShown: false, animation: "fade" }}>

            <Stack.Screen options={{ unmountOnBlur: true}} name="ExploreHome" component={Explore}/>
            <Stack.Screen options={{unmountOnBlur: true}} name="EventPresentation" component={EventPresentation}/>
            <Stack.Screen options={{ unmountOnBlur: true}} name="UserForm" component={UserForm}/>
            <Stack.Screen options={{ unmountOnBlur: true}} name="Notifications" component={Notifications}/>
            <Stack.Screen options={{unmountOnBlur: true}} name="Topics" component={Topics}/>
            <Stack.Screen options={{ unmountOnBlur: true}} name="DiscussionChat" component={DiscussionChat}/>
            
        </Stack.Navigator>
    )
}