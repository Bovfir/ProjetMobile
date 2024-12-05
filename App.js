import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';


import ConnexionNavigation from './components/ConnectionNavigator'
import ExploreNavigation from "./components/ExploreNavigator";
import ProfileNavigator from './components/ProfileNavigator';


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            switch (route.name) {
              case 'Home':
                iconName = focused ? 'home' : 'home-outline';
                break;
              case 'Tabs':
                iconName = focused ? 'settings' : 'settings-outline';
                break;
              case 'My Event':
                iconName = focused ? 'calendar' : 'calendar-outline';
                break;
              default:
                iconName = 'help-circle-outline';
            }
            
            // Retourne l'icône avec le nom correspondant
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#4B0082', 
          tabBarInactiveTintColor: 'black',  
        })}
      >
        <Tab.Screen name="Home" component={ConnexionNavigation} />
        <Tab.Screen name="Explore" component={ExploreNavigation}/>
        <Tab.Screen name="My Event" component={ExploreNavigation} />
        <Tab.Screen name="Profile" component={ProfileNavigator} />
      </Tab.Navigator> 
    </NavigationContainer>
  );
};