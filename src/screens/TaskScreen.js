import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import TaskList from '../components/TaskList';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';

const TaskScreen = () => {
  const [task, setTask] = useState('');
  const [tasklist, setTasklist] = useState([]);
  const [error, setError] = useState('');

  const addTask = () => {
    if (task.trim()) {
      setTasklist([...tasklist, { key: Date.now().toString(), text: task, completed: false }]);
      setTask('');
      setError(''); // Clear error if task is added successfully
    } else {
      setError('Task cannot be empty'); // Set error message
    }
  };

  const deleteTask = (taskKey) => {
    setTasklist(tasklist.filter(item => item.key !== taskKey));
  };

  const toggleTaskCompletion = (taskKey) => {
    setTasklist(
      tasklist.map(item =>
        item.key === taskKey ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.halfScreenBackground} />
      <View style={styles.container}>
        <Text style={styles.header}>Hello User</Text>
        <Text style={styles.subHeader}>What are you going to do?</Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add To-Do"
            value={task}
            onChangeText={setTask}
          />
          <TouchableOpacity onPress={addTask} style={styles.addButton}>
            <FontAwesomeIcon icon={faAdd} size={20} color="black" />
          </TouchableOpacity>
        </View>
        
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        
        <Text style={styles.todoHeader}>Your To-Do List:</Text>
        
        <TaskList 
          tasklist={tasklist}
          toggleTaskCompletion={toggleTaskCompletion}
          deleteTask={deleteTask} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  halfScreenBackground: {
    position: 'absolute',
    width: '100%',
    height: '30%',
    backgroundColor: '#037aff',
    borderBottomEndRadius: '20%',
    borderBottomStartRadius: '20%',
  },
  container: {
    flex: 1,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomEndRadius: 50,
    borderBottomStartRadius: 50,
  },
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
    marginBottom: 10,
  },
  todoHeader: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
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
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default TaskScreen;