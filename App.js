import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';


import ExploreNavigation from "./navigator/ExploreNavigator";
import ProfileNavigator from './navigator/ProfileNavigator';


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
              case 'Explore':
                iconName = focused ? 'earth' : 'earth-outline';
                break;
              case 'My Event':
                iconName = focused ? 'calendar' : 'calendar-outline';
                break;
              case 'Profile':
                iconName = focused? 'person' : 'person-outline';
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
        <Tab.Screen name="Home" component={ExploreNavigation} />
        <Tab.Screen name="Explore" component={ExploreNavigation}/>
        <Tab.Screen name="My Event" component={ExploreNavigation} />
        <Tab.Screen name="Profile" component={ProfileNavigator} />
      </Tab.Navigator> 
    </NavigationContainer>
  );
};