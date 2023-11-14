import React from 'react';
import { View, StyleSheet, Dimensions, ScrollView, } from 'react-native';
import TaskItem from './TaskItem';

const { width, height } = Dimensions.get('window');

const TaskList = ({
  tasks,
  handleToggleCompletion,
  response
}) => {
  return (
    <ScrollView style={styles.taskList} showsVerticalScrollIndicator={false}  >
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          handleToggleCompletion={handleToggleCompletion}
          response={response}
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