import EventPresentation from '../pages/EventPresentation';
import Home from '../pages/Home';
import Topics from "../pages/Topics";
import DiscussionChat from "../pages/DiscussionChat";
import Notifications from '../pages/Notifications';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

export default function HomeNavigator (){
  return (
    <Stack.Navigator initialRouteName="HomeMain" screenOptions={{ headerShown: false, animation: "fade"}}>

      <Stack.Screen options={{unmountOnBlur: true}} name="HomeMain" component={Home}/>
      <Stack.Screen options={{unmountOnBlur: true}} name="EventPresentation" component={EventPresentation}/>
      <Stack.Screen options={{unmountOnBlur: true}} name="Topics" component={Topics}/>
      <Stack.Screen options={{ unmountOnBlur: true}} name="DiscussionChat" component={DiscussionChat}/>
      <Stack.Screen options={{unmountOnBlur: true}} name="Notifications" component={Notifications}/>

    </Stack.Navigator>
  )
}