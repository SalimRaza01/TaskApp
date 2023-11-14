import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, Image, TouchableOpacity } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import axios from 'axios';
const { width, height } = Dimensions.get('window');

const TaskDetails = ({ route }) => {

  const BASE_URL = 'http://115.246.121.146:3000';

  const { task, handleToggleCompletion } = route.params;
  const { deadline, createdAt } = task;
  const [comment, setComment] = useState('');

  const handleCommentChange = (text) => {
    setComment(text);
  };
  const handleCommentSubmit = () => {
    const commentData = {
      taskId: task._id,
      comments: comment,
    };

    task.comments = task.comments || [];
    task.comments.push(comment);

    axios.post(`${BASE_URL}/save-comment`, commentData)
      .then(response => {
        console.log('Comment saved:', response.data);

        setComment('');
      })
      .catch(error => {
        console.error('Error saving comment:', error);
      });
  };

  const rangeDates = {};
  let currentDate = new Date(createdAt);
  const endDate = new Date(deadline);

  LocaleConfig.locales['en'] = {
    monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    monthNamesShort: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'],
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  };

  LocaleConfig.defaultLocale = 'en';
  while (currentDate <= endDate) {
    const date = currentDate.toISOString().split('T')[0];
    rangeDates[date] = { color: "#43BE31" };
    currentDate.setDate(currentDate.getDate() + 1);
  }

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

  const customDayRenderer = (date) => {
    const dateString = date.dateString;
    if (rangeDates[dateString]) {
      return (
        <View style={styles.customDayContainer}>
          <Text style={styles.customDayText}>{date.day}</Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[
        styles.Tasktitle,
        task.status === 'Completed' && styles.completedTaskText,
      ]}>Task: {task.title}</Text>

      <Text style={styles.Taskdecription}>Description: {task.description}</Text>

      <TouchableOpacity style={[
        styles.button,
        task.status === 'Completed' && styles.completedButton,
      ]} onPress={() => handleToggleCompletion(task._id)}>
        <Text style={styles.buttonText}>{task.status === 'Completed' ? 'Pending' : 'Completed'}</Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
     
        <View style={styles.Prioritybox}>
          <Text style={styles.TaskPriorityText}>Priority:{task.priority} </Text>
        </View>
        <View style={styles.Deadlinebox}>
          <Text style={styles.DeadlineText}>Deadline: {formatDeadline(task.deadline).formattedDeadline}</Text>
        </View>

      </View>
      <Calendar
        style={{
          backgroundColor: "#fff",
          marginTop: height * 0.015,
          marginBottom: height * 0.006,
          borderRadius: width * 0.03,
          height: height * 0.42,
          elevation: 5,
          shadowColor: '#000000',
        }}
        current={deadline}
        markingType={'period'}
        markedDates={rangeDates}
        renderDay={(date) => customDayRenderer(date)}
      />
      {/* <View style={styles.commentBox}>
        <Text style={styles.commentText}>{comment}</Text>
        <Image style={styles.UserProfileImage} source={require('../assets/profile.png')} />
      </View> */}

      <TextInput
        style={[styles.input, { color: '#000', backgroundColor: '#fff' }]}
        placeholderTextColor="#999"
        placeholder=" Comment"
        onChangeText={handleCommentChange} />

      <TouchableOpacity style={styles.CommentSendBtn} onPress={handleCommentSubmit} >
        <Image style={styles.SendIcon} source={require('../assets/Send.png')} />
      </TouchableOpacity>

    </View>
  );
}

export default TaskDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f7f7f7",
  },
  completedButton: {
    backgroundColor: "#808080",
  },
  button: {
    marginTop: height * -0.056,
    width: width * 0.3,
    padding: width * 0.030,
    borderRadius: width * 0.03,
    alignItems: "center",
    backgroundColor: "#007BFF",
  alignSelf:"flex-end"
  },
  buttonText: {
    color: "#fff",
    fontSize: width * 0.035,
    fontWeight: "bold",
  },
  taskStatus: {
    fontSize: width * 0.035,
    fontWeight: "bold",
    color: "#666",
  },
  CommentSendBtn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007BFF",
    paddingVertical: height * 0.02,
    borderRadius: width * 1,
    marginTop: height * -0.075,
    marginBottom: height * 0.02,
    width: width * 0.09,
    height: height * 0.045,
    marginLeft: width * 0.78,
  },
  SendIcon: {
    width: width * 0.05,
    height: width * 0.05,
  },
  commentBox: {
    backgroundColor: "#FFFFFF",
    paddingVertical: height * 0.01,
    borderRadius: width * 0.02,
    width: width * 0.9,
    height: height * 0.06,
    marginTop: height * 0.02,
    marginBottom: height * 0.01,
    padding: width * 0.04,
    borderRadius: width * 0.03,
    elevation: 2,
    
  },
  UserProfileImage: {
    marginLeft: width * 0.001,
    width: width * 0.08,
    height: width * 0.08,
    marginTop: height * -0.033,
  },
  commentText: {
    marginTop: height * 0.008,
    // marginLeft: width * 0.1,
  },

  divider: {
    marginTop: height * 0.02,
    backgroundColor: "#007BFF",
    height: 2,
  },
  DeadlineText: {
    fontSize: width * 0.03,
    color: '#FFF',
    fontWeight: "600",
    textAlign: "right",
  },
  TaskPriorityText: {
    fontSize: width * 0.03,
    fontWeight: "600",
    color: '#FFF',
    textAlign: "left",
  },
  Deadlinebox: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    paddingVertical: height * 0.01,
    borderRadius: width * 0.02,
    width: width * 0.43,
    height: height * 0.05,
    marginTop: height * 0.02,
    marginBottom: height * 0.02,
  },
  Prioritybox: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF9500",
    paddingVertical: height * 0.01,
    borderRadius: width * 0.02,
    width: width * 0.43,
    height: height * 0.05,
    marginTop: height * 0.02,
    marginBottom: height * 0.02,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: width * 0.025,
    marginTop: height * 0.03,
    marginBottom: height * 0.02,
    borderRadius: width * 0.02,
    fontSize: width * 0.04,
  },
  datePicker: {
    backgroundColor: "#fff",
    marginTop: height * 0.015,
    marginBottom: height * 0.006,
    borderRadius: width * 0.03,
    elevation: 5,
    shadowColor: '#000000',
  },
  Taskdecription: {
    fontSize: width * 0.03,
    color: "#333",
    textAlign: "left",
  },
  Tasktitle: {
    fontSize: width * 0.05,
    fontWeight: "bold",
    marginBottom: 7,
    marginTop: 2,
    color: "#333",
    textAlign: "left",
  },
  customDayContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 35,
    height: 35,
    backgroundColor: '#007BFF',
    borderRadius: 17.5,
  },
  customDayText: {
    color: 'white',
    fontWeight: 'bold',
  },
})