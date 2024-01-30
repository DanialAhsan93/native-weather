import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home';
import About from './src/screens/About';
import List from './src/screens/List';
import axios from 'axios';


export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator 
      initialRouteName='Home' 
      screenOptions={{ headerTintColor: '#fff' }}>
        <Stack.Screen
          name='Home'
          component={Home}
          options={{
            // headerTitle: "Weather app",
            // headerTitleAlign: 'center',
            // headerTitleStyle: {
            //   fontSize: 30,
            //   color:'#fff',
            // },
            headerStyle: {
              backgroundColor: 'purple'
            },
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='About'
          component={About}
          options={{
            headerTitle: "About",
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 30,
              color: '#fff',
            },
            headerStyle: {
              backgroundColor: '#382f51'
            },
            // headerShown : false,
          }}
        />
        <Stack.Screen
          name='List'
          component={List}
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
}


