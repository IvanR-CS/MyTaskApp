import { faSquare, faSquareCheck } from '@fortawesome/free-regular-svg-icons';
import { faAdd, faBoxOpen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const TaskList = (props) => {

  return (
   
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
        </View>
        <FlatList
          data={props.tasklist}
          renderItem={({ item }) => (
            <View style={styles.taskContainer}>
              <TouchableOpacity onPress={() => props.toggleTaskCompletion(item.key)}>
              <FontAwesomeIcon 
              icon={item.completed ? faSquareCheck : faSquare} 
              size={15} 
              color="black" />
              </TouchableOpacity>
              <Text style={[styles.taskText, item.completed && styles.completed]}>
              {item.text}</Text>
              <TouchableOpacity onPress={() => props.deleteTask(item.key)}>
              <FontAwesomeIcon icon={faTrash} size={15} color="black" />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  

  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  subHeader: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 0,
    padding: 10,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: 'white',
  },
  addButton: {
    backgroundColor: 'white',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 0,
    borderRadius: 0,
  },
  todoHeader: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    elevation: 1,
  },
  taskText: {
    flex: 1,
    marginLeft: 30,
    fontSize: 15,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});

export default TaskList;