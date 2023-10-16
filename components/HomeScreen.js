import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import TaskList from './TaskList';
import TaskModal from './TaskModel';
import axios from 'axios'; // Import Axios

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'Pending',
    deadline: '',
    createdAt: '',
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [validationError, setValidationError] = useState(false);

  const BASE_URL = 'http://10.0.2.2:3000';

  useEffect(() => {
    // Fetch tasks from the API
    axios.get(`${BASE_URL}/tasks`)
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // updated code
  const handleAddTask = () => {
    // Validation
    if (!task.title || !task.description || !task.deadline) {
      setValidationError(true);
      return;
    }
    setValidationError(false);
    axios.post(`${BASE_URL}/tasks`, task)
      .then(response => {
        setModalVisible(false);
        setTask({
          title: '',
          description: '',
          status: 'Pending',
          deadline: '',
          createdAt: '',
        });
        setTasks([...tasks, response.data]);
      })
      .catch(error => console.error('Error adding data:', error));
  };

  const handleEditTask = () => {
    if (!editingTask || !editingTask._id) {
      console.error('Invalid task or task _id.');
      return;
    }

    axios.put(`${BASE_URL}/tasks/${editingTask._id}`, task)
      .then(response => {
        setModalVisible(false);
        setTasks(tasks.map(t => (t._id === response.data._id ? response.data : t)));
      })
      .catch(error => console.error('Error editing task:', error));
  };

  const handleDeleteTask = (taskId) => {
    axios.delete(`${BASE_URL}/tasks/${taskId}`)
      .then(() => {
        setTasks(tasks.filter(t => t._id !== taskId));
      })
      .catch(error => console.error('Error deleting task:', error));
  };

  const handleToggleCompletion = (taskId) => {
    const updatedTasks = tasks.map(t => {
      if (t._id === taskId) {
        return { ...t, status: t.status === 'Pending' ? 'Completed' : 'Pending' };
      }
      return t;
    });

    axios.put(`${BASE_URL}/tasks/${taskId}`, updatedTasks.find(t => t._id === taskId))
      .then(() => {
        setTasks(updatedTasks);
      })
      .catch(error => console.error('Error toggling task completion:', error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Manager</Text>
      <View style={styles.divider} />
      <TaskList
        tasks={tasks}
        handleEditTask={handleEditTask}
        handleToggleCompletion={
          handleToggleCompletion
        }
        handleDeleteTask={handleDeleteTask}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setEditingTask(null);
          setTask({
            title: "",
            description: "",
            status: "Pending",
            deadline: "",
            createdAt: "",
          });
          setModalVisible(true);
          setValidationError(false);
        }}>
        <Text style={styles.addButtonText}>
          {editingTask ? "Edit Task" : "Add Task"}
        </Text>
      </TouchableOpacity>

      <TaskModal
        modalVisible={modalVisible}
        task={task}
        setTask={setTask}
        handleAddTask={handleAddTask}
        handleCancel={() => {
          setEditingTask(null);
          setTask({
            title: "",
            description: "",
            status: "Pending",
            deadline: "",
            createdAt: "",
          });
          setModalVisible(false);
          setValidationError(false);
        }}
        validationError={validationError} />
    </View>
  );
};

export default HomeScreen; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f7f7f7",
  },
  title: {
    fontSize: width * 0.08,
    fontWeight: "bold",
    marginTop: height * 0.04,
    marginBottom: -10,
    color: "#333",
    textAlign: "left",
  },
  divider: {
    marginTop: height * 0.04,
    backgroundColor: "#007BFF",
    height: 2,
  },
  addButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007BFF",
    paddingVertical: height * 0.02,
    borderRadius: width * 0.1,
    marginTop: height * 0.04,
    marginBottom: height * 0.02,
  },
  addButtonText: {
    color: "#fff",
    fontSize: width * 0.05,
    fontWeight: "bold",
  },
});