import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, TextInput } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

const { width, height } = Dimensions.get('window');

const TaskDetails = ({ route }) => {
  const { task } = route.params;
  const { deadline, createdAt } = task;

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
    rangeDates[date] = { color: "#007BFF" };
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

  return (
    <View style={styles.container}>
      <Text style={styles.Tasktitle}>Task: {task.title}</Text>
      <Text style={styles.Taskdecription}>Description: {task.description}</Text>
      <View style={styles.divider} />

      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <View style={styles.Prioritybox}>
          <Text style={styles.TaskPriorityText}>Priority: High</Text>
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
      />
      <TextInput
        style={[styles.input, { color: '#000', backgroundColor: '#fff' }]}
        placeholderTextColor="#999"
        placeholder=" Comment" />
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
    marginTop: height * 0.02,
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

})