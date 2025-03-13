import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import MovieHomeScreen from '../screens/Apps/MovieApps/MovieHomeScreen';
import MovieDetailScreen from '../screens/Apps/MovieApps/MovieDetailScreen';
import Test from '../screens/Apps/TestApi/Test';

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={MovieHomeScreen} options={{headerTitle: '', headerShown: ''}}/>
      <Stack.Screen name="MovieDetails" component={MovieDetailScreen} options={{headerTitle: '', headerBackTitle: 'true', headerShown:  '' }} />
      <Stack.Screen name="TestApiScreen" component={Test} options={{headerTitle: 'Test App'}}/>

    </Stack.Navigator>
  );
};

export default HomeStackNavigator;