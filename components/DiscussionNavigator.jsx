import Messages from "../screens/Messages";
import DiscussionChat from "./DiscussionChat";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

export default function TabNavigator (){
    return (
        <Stack.Navigator
            initialRouteName="Messages"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen
                initialParams={{
                    screen: 'Messages',
                }}
                options={{
                    unmountOnBlur: true,
                }}
                name="Messages"
                component={Messages}
            />

            <Stack.Screen
                initialParams={{
                    screen: 'DiscussionChat',
                }}
                options={{
                    unmountOnBlur: true,
                }}
                name="DiscussionChat"
                component={DiscussionChat}
            />
        </Stack.Navigator>
    )
}