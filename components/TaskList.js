import React from 'react';
import { View, StyleSheet, Dimensions, ScrollView, } from 'react-native';
import TaskItem from './TaskItem';

const { width, height } = Dimensions.get('window');

const TaskList = ({
  tasks,
  response,
  openTaskDetails
}) => {
  return (
    <ScrollView style={styles.taskList} showsVerticalScrollIndicator={false}  >
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          response={response}
          openTaskDetails={openTaskDetails}
        />
      ))}
    </ScrollView>
  );
};

export default TaskList;

const styles = StyleSheet.create({
 
    taskList: {
      flex: 1,
      height: height * 0.59,
    },
   
  });