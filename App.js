import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialCommunityIcons,Feather } from '@expo/vector-icons'; // npm install react-native-vector-icons

import TabNavigation from './components/TabNavigator';
import Home from './screens/Home';
import Explore from './screens/Explore';
import DiscussionNavigator from './components/DiscussionNavigator';

const Tab = createBottomTabNavigator();

const ICON_MAP = {
  Home: {
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

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            const iconData = ICON_MAP[route.name];
            if(!iconData) return null;

            const IconComponent = iconData.component;
            const iconName = focused ? iconData.focused : iconData.unfocused;

            return <IconComponent name={iconName} size={size} color={color}/>;
          },
          tabBarActiveTintColor: '#4B0082',
          tabBarInactiveTintColor: 'black',
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Explore" component={Explore}/>
        <Tab.Screen name="My Event" component={DiscussionNavigator} />
        <Tab.Screen name="Profile" component={TabNavigation} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
