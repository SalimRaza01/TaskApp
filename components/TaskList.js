import React from "react";
import { ScrollView, StyleSheet, Dimensions } from "react-native";
import TaskItem from "./TaskItem";

const TaskList = ({
	tasks,
	handleEditTask,
	handleToggleCompletion,
	handleDeleteTask,
}) => {
	return (
		<ScrollView style={styles.taskList}>

			{tasks.map((t) => (
				<TaskItem
					key={t.id}
					task={t}
					handleEditTask={handleEditTask}
					handleToggleCompletion={
						handleToggleCompletion
					}
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
