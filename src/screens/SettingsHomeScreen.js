import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {  faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBell, faEye, faUser } from '@fortawesome/free-regular-svg-icons';



const settingsOptions = [
  { id: '1', title: 'Account', screen: 'Account', icon:faUser}, 
  { id: '2', title: 'Notifications', screen: 'Notifications', icon:faBell },
  { id: '3', title: 'Appearance', screen: 'Appearance', icon:faEye },
  { id: '4', title: 'Privacy', screen: 'Privacy', icon:faBell },
];

const SettingsScreen = () => {
  const navigation = useNavigation();

const renderItem = ({ item }) => (
  <TouchableOpacity 
    style={styles.item} 
    onPress={() => navigation.navigate(item.screen)}
  >
    <FontAwesomeIcon icon={item.icon} size={19} style={item.icon}/>
    <Text style={styles.itemText}>{item.title}</Text>
    <FontAwesomeIcon icon={faAngleRight} size={19} style={item.arrowicon} />
  </TouchableOpacity>
);

return (
  <View style={{ flex: 1 }}>
    <FlatList
      data={settingsOptions}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
    />
 
  </View>
);
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 24,
  },
  item: {
    padding: 20,
    marginVertical: 0,
    backgroundColor: '#fff',
    borderColor: 'black',
    borderWidth: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    color: 'black', 
  },

  arrowicon: {
    color: 'black', 
  } ,

  itemText: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'left',
    marginLeft: 10,
  },

});

export default SettingsScreen;