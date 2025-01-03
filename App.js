import React, {useContext} from 'react';
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialCommunityIcons,Feather, FontAwesome } from '@expo/vector-icons'; 
import { AuthProvider, AuthContext } from "./utils/AuthContext";
import HomeNavigator from './screens/Navigator/HomeNavigator';
import MyEventNavigator from "./screens/Navigator/MyEventNavigator";
import ProfileNavigator from "./screens/Navigator/ProfileNavigator";
import ExploreNavigator from "./screens/Navigator/ExploreNavigator";
import Connection from "./screens/pages/Connection";
import UserForm from './screens/pages/UserForm';
import Toast from "react-native-toast-message";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BaseToast } from 'react-native-toast-message';
import store from './store/store';
import { Provider } from 'react-redux';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ICON_MAP = {
  "Home": {
    component: Ionicons,
    focused: "home",
    unfocused: "home-outline",
  },
  "Profile": {
    component: Feather,
    focused: "user",
    unfocused: "user",
  },
  "My Event": {
    component: MaterialCommunityIcons,
    focused: "calendar-month",
    unfocused: "calendar-month-outline",
  },
  "Explore": {
    component: Ionicons,
    focused: "compass",
    unfocused:"compass-outline",
  }
};

const MainTabs = () => (
<Tab.Navigator
  initialRouteName="Home"
  screenOptions={({ route }) => ({
    headerShown: false,
    tabBarIcon: ({ focused, color, size }) => {
      const iconData = ICON_MAP[route.name];
      if (!iconData) return null;
      const IconComponent = iconData.component;
      const iconName = focused ? iconData.focused : iconData.unfocused;
      return <IconComponent name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: '#4B0082',
    tabBarInactiveTintColor: 'black',
  })}
>
  <Tab.Screen name="Home" component={HomeNavigator} options={{ unmountOnBlur: true }} />
  <Tab.Screen name="Explore" component={ExploreNavigator} options={{ unmountOnBlur: true }} />
  <Tab.Screen name="My Event" component={MyEventNavigator} options={{ unmountOnBlur: true }} />
  <Tab.Screen name="Profile" component={ProfileNavigator} options={{ unmountOnBlur: true }} />
</Tab.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Login" component={Connection}></Stack.Screen>
    <Stack.Screen name="UserForm" component={UserForm}></Stack.Screen>
  </Stack.Navigator>
);

const AppNavigator = () => {
    const { isAuthenticated, isLoading} = useContext(AuthContext);
    if(isLoading){
      return null;
    } 

    return (
      <NavigationContainer>
        {isAuthenticated ? <MainTabs/> : <AuthStack/>}
      </NavigationContainer>
    )
};

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'green' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: 'bold',
      }}
      text2Style={{
        fontSize: 13,
      }}
      renderLeadingIcon={() => (<Ionicons name="checkmark-circle" size={24} color="green"/>)}
    />
  ),
  error: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'red' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: 'bold',
      }}
      text2Style={{
        fontSize: 13,
      }}
      renderLeadingIcon={() => (<Ionicons name="close-circle" size={24} color="red"/>)}
    />
  ),
  info: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'blue' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: 'bold',
      }}
      text2Style={{
        fontSize: 13,
      }}
      renderLeadingIcon={() => (<FontAwesome name="info-circle" size={24} color="blue"/>)}
    />
  ),
};


export default function App(){
    return (
      <Provider store={store}>
      <AuthProvider>
        <AppNavigator/>
        <Toast config={toastConfig}/>
      </AuthProvider>
      </Provider>
    );
};
