import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import TaskItem from "./TaskItem";

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
          key={task.id}  
          task={task}
          handleEditTask={handleEditTask}
          handleToggleCompletion={handleToggleCompletion}
          handleDeleteTask={handleDeleteTask}
        />
      ))}
    </ScrollView>
  );
};

export default TaskList;

const styles = StyleSheet.create({
	taskList: {
		flex: 1,

	},
})
