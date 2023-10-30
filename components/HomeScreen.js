import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Button } from 'react-native';
import { Calendar } from 'react-native-calendars';
import TaskModal from './TaskModal';
import TaskList from './TaskList';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ route }) => {
  const navigation = useNavigation();

  let yourAuthTokenHere = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTM4ZjIxMmE3ZDUwODgxMzY2ZjE4MTQiLCJpYXQiOjE2OTgzMTc5NDUsImV4cCI6MTY5OTYxMzk0NX0.S_Q47z4EBwcV4FaAKXTLAo4o-nmZ8ZKEMlU66OqupIE';

  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'Pending',
    deadline: '',
    createdAt: '',
    priority: '',
  });

  const [userId, setUserId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [validationError, setValidationError] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [markedDates, setMarkedDates] = useState({});
  const [isCalendarVisible, setCalendarVisible] = useState(false);

  const BASE_URL = 'http://10.0.2.2:3000';

  useEffect(() => {

    const retrieveAuthToken = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        const storedUserId = await AsyncStorage.getItem('userId');
        if (token && storedUserId) {
          yourAuthTokenHere = token;
          setUserId(storedUserId);
          fetchTasks();
        }
      } catch (error) {
        console.error('Error retrieving token:', error);
      }
    };
    retrieveAuthToken();
    if (route.params && route.params.task) {
      setTask(route.params.task);
    }
    fetchTasks();
  }, [route.params]);

  const { username } = route.params;

  const fetchTasks = () => {
    axios.get(`${BASE_URL}/send-data`, {
      headers: {
        'Authorization': `Bearer ${yourAuthTokenHere}`,
        'UserId': userId,
      },
    })
      .then(response => {
        const markedDates = response.data.reduce((dates, task) => {
          const date = new Date(task.createdAt).toISOString().split('T')[0];
          dates[date] = { selected: true, selectedColor: "#0A79DF" };
          return dates;
        }, {});

        setTasks(response.data);
        setMarkedDates(markedDates);
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
      createdAt: new Date().toLocaleString(),
      ...route.params,
    };

    const updatedTaskStringified = JSON.stringify(updatedTask);

    axios.post(`${BASE_URL}/send-data`, updatedTaskStringified, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${yourAuthTokenHere}`,
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
          priority: "",
        });
        setTasks([...tasks, response.data]);
      })
      .catch(error => console.error('Error adding data:', error));
  };

  const handleEditTask = (taskId) => {
    console.log('Task being edited:', task);
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

  const handleDeleteTask = (taskId) => {
    axios.delete(`${BASE_URL}/delete/${taskId}`)
      .then(() => {
        setTasks(tasks.filter(t => t._id !== taskId));
      })
      .catch(error => console.error('Error deleting task:', error));
  };

  const handleCancel = () => {
    if (task._id) {
      setTask({
        title: '',
        description: '',
        status: 'Pending',
        deadline: '',
        createdAt: '',
        priority: '',
      });
    } else {
      setModalVisible(false);
      setValidationError(false);
    }
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const formatDeadline = (deadline) => {
    const date = new Date(deadline);
    const day = date.getDate().toString().padStart(2, '0');
    const options = { month: 'short' };
    const monthName = new Intl.DateTimeFormat('en-US', options).format(date);
    const formattedDeadline = `${day} ${monthName}`;
    return { day, monthName, formattedDeadline };
  };

  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    const day = date.getDate().toString().padStart(2, '0');
    const options = { month: 'short' };
    const dayName = new Intl.DateTimeFormat('en-US', options).format(date);
    return { day, dayName };
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('userId');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.WelcomeText}>Welcome,</Text>

      <Text style={styles.UserName}>{username}</Text>

      <TouchableOpacity >
        <Image style={styles.UserProfileImage} source={require('../assets/profile.png')} />
      </TouchableOpacity>

      <View style={styles.divider} />

      <ScrollView showsVerticalScrollIndicator={false} >

        <View style={{ marginBottom: width * 0.03 }}>
          <Button title="Log out" onPress={handleLogout} />

          <Button title="Open Modal" onPress={openModal} />

        </View>

        {isCalendarVisible && (
          <Calendar
            current={selectedDate}
            onDayPress={(day) => setSelectedDate(day.dateString)}
            markedDates={markedDates}
          />
        )}
        {tasks.length === 0 ? (
          <Image
            source={require('../assets/NoTask.png')}
            style={styles.noTasksImage} />
        ) : (
          <TaskList
            tasks={tasks}
            handleEditTask={handleEditTask}
            handleToggleCompletion={handleToggleCompletion}
            handleDeleteTask={handleDeleteTask}
          />
        )}
      </ScrollView>

      <TaskModal route={route}
        modalVisible={modalVisible}
        task={task}
        setTask={setTask}
        handleAddTask={handleAddTask}
        handleCancel={handleCancel}
        validationError={validationError}
      />

    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  WelcomeText: {
    fontSize: width * 0.04,
    fontWeight: "bold",
    marginTop: height * -0.01,
    marginBottom: -10,
    color: "#333",
    textAlign: "left",
  },
  UserName: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    marginTop: height * 0.01,
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
    borderRadius: width * 0.02,
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
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: width * 0.04,
    borderRadius: width * 0.03,
    elevation: 5,
  },
  taskTextContainer: {
    flex: 1,
  },
  taskText: {
    fontSize: width * 0.05,
    fontWeight: "bold",
    color: "#333",
    marginBottom: height * 0.003,
  },
  completedTaskText: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  taskDescription: {
    fontSize: width * 0.03,
    color: "#666",
    marginBottom: height * 0.03,
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
    marginBottom: height * 0.02,
  },
  buttonContainer: {
    flexDirection: "column",
    marginVertical: height * 0.001,
  },
  completeButton: {
    backgroundColor: "#4CAF50",
    borderRadius: width * 0.015,
    padding: width * 0.022,
    marginBottom: height * 0.01,
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
  taskTime: {
    fontSize: width * 0.04,
    color: "#666",
  },
  button: {
    padding: width * 0.040,
    borderRadius: width * 0.03,
    marginTop: height * 0.01,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: width * 0.035,
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
  taskDay: {
    color: "#FFFFFF",
    fontSize: width * 0.03,
    alignSelf: "center",
    fontWeight: "600",
  },
  taskDate: {
    color: "#0A79DF",
    marginBottom: height * 0.003,
    fontSize: width * 0.08,
    fontWeight: "600",
    alignSelf: "center",
  },
  taskdaystyle: {
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#FF3B30",
    height: height * 0.03,
    borderTopLeftRadius: width * 0.03,
    borderTopRightRadius: width * 0.03,
  },
  taskDeadlinebottom: {
    color: "#707070",
    marginBottom: height * 0.008,
    fontSize: width * 0.021,
    fontWeight: "600",
    alignSelf: "center",
  },
  UserProfileImage: {
    alignSelf: "flex-end",
    width: width * 0.11,
    height: width * 0.11,
    marginBottom: height * -0.012,
    marginTop: height * -0.05,
  },
  ViewTaskButton: {
    backgroundColor: "#007BFF",
    borderRadius: width * 0.015,
    padding: width * 0.022,
    alignItems: "center",
    width: width * 0.25,
  },
  swipeoutContainer: {
    backgroundColor: 'lightgray',
    height: width * 0.37,
  },
  noTasksImage: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "contain",
    width: width * 0.75,
    height: width * 0.75,
    marginTop: height * 0.02,
  }
});