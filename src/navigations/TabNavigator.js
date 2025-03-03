import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import TaskScreen from '../screens/TaskScreen';
import SettingsStackNavigator from '../navigations/SettingsStackNavigator';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCog, faHome, faTasks } from '@fortawesome/free-solid-svg-icons';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
        tabBarActiveTintColor: '#2f95dc',
        tabBarInactiveTintColor: '#8e8e93',
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen}  options={{tabBarIcon: ({ color, size }) => (
      <FontAwesomeIcon icon={faHome} size={20} color={'black'} /> ), }} />
      <Tab.Screen name="Task" component={TaskScreen} options={{tabBarIcon: ({ color, size }) => (
      <FontAwesomeIcon icon={faTasks} size={20} color={'black'} /> ), }} />
      <Tab.Screen name="Settings" component={SettingsStackNavigator} options={{tabBarIcon: ({ color, size }) => (
      <FontAwesomeIcon icon={faCog} size={20} color={'black'} /> ), }}/>
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    height: 70,
    paddingBottom: 5,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
});