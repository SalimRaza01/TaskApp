import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Modal, TextInput } from 'react-native';
import DatePicker from "react-native-modern-datepicker";
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const TaskList = ({
  tasks,
  handleEditTask,
  handleToggleCompletion,
  handleDeleteTask,
}) => {
  return (
    <ScrollView style={styles.taskList} showsVerticalScrollIndicator={false}>
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          handleEditTask={handleEditTask}
          handleToggleCompletion={handleToggleCompletion}
          handleDeleteTask={handleDeleteTask}
        />
      ))}
    </ScrollView>
  );
};

const TaskItem = ({
  task,
  handleEditTask,
  handleToggleCompletion,
  handleDeleteTask,
  onEdit
}) => {
  return (
    <View style={styles.taskItem}>
      <View style={styles.taskTextContainer}>
        <Text
          style={[
            styles.taskText,
            task.status === 'Completed' && styles.completedTaskText,
          ]}>
          {task.title}
        </Text>
        <Text style={styles.taskDescription}>
          Description: {task.description}
        </Text>
        <Text style={styles.taskStatus}>Status: {task.status}</Text>
        <Text style={styles.taskDeadline}>Deadline: {task.deadline}</Text>
        <Text style={styles.taskCreatedAt}>Created: {task.createdAt}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => handleEditTask(task)}
          style={[styles.editButton]}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleToggleCompletion(task._id)}
          style={[
            styles.completeButton,
            task.status === 'Completed' && styles.completedButton,
          ]}>
          <Text style={styles.buttonText}>
            {task.status === 'Completed' ? 'Pending' : 'Completed'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDeleteTask(task._id)}
          style={[styles.deleteButton]}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const TaskModal = ({
  modalVisible,
  task,
  setTask,
  handleAddTask,
  handleCancel,
  validationError,
}) => {
  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={false}>
      <View style={styles.modalContainer}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={task.title}
          onChangeText={(text) =>
            setTask({ ...task, title: text })
          } />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={task.description}
          onChangeText={(text) =>
            setTask({
              ...task,
              description: text,
            })
          } />
        <Text style={styles.inputLabel}>
          Deadline:
        </Text>
        <DatePicker
          style={styles.datePicker}
          mode="datepicker"
          selected={task.deadline}
          onDateChange={(date) =>
            setTask({ ...task, deadline: date })
          } />
        {validationError && (
          <Text style={styles.errorText}>
          </Text>
        )}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#007BFF" }]}
          onPress={handleAddTask}
        >
          <Text style={styles.buttonText}>{task._id ? "Update" : "Add"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#FF3B30" }]}
          onPress={handleCancel}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const HomeScreen = ({ route }) => {
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
    if (route.params && route.params.task) {
      setTask(route.params.task);
    }

    // Fetch tasks from MongoDB
    fetchTasks();
  }, [route.params]);

  const fetchTasks = () => {
    axios.get(`${BASE_URL}/send-data`)
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => console.error('Error fetching tasks:', error));
  };
  const handleAddTask = () => {

    if (!task.title || !task.deadline) {
      setValidationError(true);
      return;
    }

    const updatedTask = {
      ...task,
      ...route.params,
    };

    const updatedTaskStringified = JSON.stringify(updatedTask);

    axios.post(`${BASE_URL}/send-data`, updatedTaskStringified, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        setModalVisible(false);
        setTask({
          title: "",
          description: "",
          status: "Pending",
          deadline: "",
          createdAt: "",
        });
        setTasks([...tasks, response.data]);
      })
      .catch(error => console.error('Error adding data:', error));
  };

  const handleEditTask = () => {
    console.log('Task being edited:', task); // Check the console for the task object
    if (!task._id) {
      console.error('Task ID is missing.');
      return;
    }

    const updatedTask = {
      ...task,
      _id: task._id,
    };
  
    axios.put(`${BASE_URL}/update/${task._id}`, updatedTask, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        setModalVisible(false);
        const updatedTasks = tasks.map(t => (t._id === task._id ? response.data : t));
        setTasks(updatedTasks);
      })
      .catch(error => console.error('Error updating task:', error));
  };
  
  
  const handleDeleteTask = (taskId) => {
    axios.delete(`${BASE_URL}/delete/${taskId}`)
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

    axios.put(`${BASE_URL}/update/${taskId}`, updatedTasks.find(t => t._id === taskId))
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
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop: height * 0.015,
    marginBottom: height * 0.007,
    padding: width * 0.04,
    borderRadius: width * 0.03,
    elevation: 5,
    shadowColor: '#000000',
  },
  taskTextContainer: {
    flex: 1,
  },
  taskText: {
    fontSize: width * 0.05,
    fontWeight: "bold",
    color: "#333",
    marginBottom: height * 0.002,
  },
  completedTaskText: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  taskDescription: {
    fontSize: width * 0.03,
    color: "#666",
    marginBottom: height * 0.04,
  },
  taskStatus: {
    fontSize: width * 0.03,
    color: "#666",
  },
  taskDeadline: {
    color: "#FF3B12",
    fontSize: width * 0.03,
  },
  taskCreatedAt: {
    color: "#007BFF",
    fontSize: width * 0.028,
    marginBottom: height * 0.025,
  },
  buttonContainer: {
    flexDirection: "column",
    marginVertical: height * 0.001,
  },
  editButton: {
    backgroundColor: "#007BFF",
    alignItems: "center",
    width: width * 0.25,
    borderRadius: width * 0.015,
    padding: width * 0.022,
    marginRight: width * 0.03,
    marginBottom: height * 0.002,
  },
  completeButton: {
    backgroundColor: "#4CAF50",
    borderRadius: width * 0.015,
    padding: width * 0.022,
    marginBottom: height * 0.002,
    marginRight: width * 0.03,
    alignItems: "center",
    width: width * 0.25,
  },
  completedButton: {
    backgroundColor: "#808080",
  },
  buttonText: {
    color: "#fff",
    fontSize: width * 0.035,
  },
  deleteButton: {
    backgroundColor: "#FF9500",
    borderRadius: width * 0.015,
    padding: width * 0.022,
    alignItems: "center",
    width: width * 0.25,
  },
  taskList: {
    flex: 1,
  },
  taskTime: {
    fontSize: width * 0.04,
    color: "#666",
  },
  button: {
    padding: width * 0.028,
    borderRadius: width * 0.03,
    marginTop: height * 0.01,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: width * 0.03,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    padding: width * 0.05,
    backgroundColor: "#FFFFFF",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: width * 0.03,
    marginBottom: height * 0.02,
    borderRadius: width * 0.02,
    fontSize: width * 0.04,
  },
  inputLabel: {
    fontSize: width * 0.04,
    fontWeight: "bold",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: width * 0.04,
    marginBottom: height * 0.02,
  },
});