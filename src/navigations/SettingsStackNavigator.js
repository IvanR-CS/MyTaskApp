import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SettingsHomeScreen from '../screens/SettingsHomeScreen';
import AccountScreen from '../screens/SettingsScreen/AccountScreen';
import AppearanceScreen from '../screens/SettingsScreen/AppearanceScreen';
import NotificationsScreen from '../screens/SettingsScreen/NotificationsScreen';
import PrivacyScreen from '../screens/SettingsScreen/PrivacyScreen';

const Stack = createStackNavigator();

const SettingsStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={SettingsHomeScreen} options={{headerTitle: '', headerShown: false,}}/>
      <Stack.Screen name="Account" component={AccountScreen} options={{headerTitle: ''}}/>
      <Stack.Screen name="Appearance" component={AppearanceScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Privacy" component={PrivacyScreen} />
    </Stack.Navigator>
  );
};

export default SettingsStackNavigator;