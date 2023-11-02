import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const NotifyScreen = (props) => {
  const [taskReminders, setTaskReminders] = useState([]);

  const BASE_URL = 'http://10.0.2.2:3000';

  useEffect(() => {
    console.log('Token in NotifyScreen:', props.route.params.token);
    fetchTasks();
  }, []);
  
  const fetchTasks = () => {

    axios.get(`${BASE_URL}/send-data`, {
      headers: {
        'Authorization': `Bearer ${props.route.params.token}`,
      },
    })
    .then(response => {
      console.log('Response data:', response.data);
      setTaskReminders(calculateTaskReminders(response.data));
    })
    .catch(error => console.error('Error fetching tasks:', error));
  };
  const calculateTaskReminders = (taskList) => {
    const currentTime = new Date();
    const reminderTime = new Date(currentTime);
    reminderTime.setDate(currentTime.getDate() + 2);
    const taskReminders = taskList.filter((task) => {
      const taskDeadline = new Date(task.deadline);
      return taskDeadline <= reminderTime;
    });

    return taskReminders;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Header}>Notification</Text>
      {taskReminders.length === 0 ? (
        <Text style={styles.NoReminders}>No task reminders</Text>
      ) : (
        taskReminders.map((task, index) => (
          <TouchableOpacity key={index}>
            <View style={styles.textbox}>
              <Text style={styles.NotifyTitle}>Task Reminder: {task.title}</Text>
              <Text style={styles.Timing}>{`Deadline: ${new Date(task.deadline).toLocaleString()}`}</Text>
            </View>
            <Text style={{ textAlign: 'center', marginTop: 1, color: '#DDDADA' }}>
            </Text>
          </TouchableOpacity>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  BackBtn: {
    marginLeft: width * 0.05,
    width: width * 0.07,
    height: width * 0.07,
    marginTop: height * -0.037,

  },
  Header: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: height * 0.03,
  },
  NoReminders: {
    textAlign: 'center',
    marginTop: height * 0.1,
    fontSize: 18,
  },
  textbox: {
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: width * 0.07,
    marginTop: height * 0.015,
    width: width * 0.85,
    height: height * 0.075,
  },
  NotifyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  Timing: {
    fontSize: 14,
    color: '#999999',
  },
});

export default NotifyScreen;
