import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

const TaskItem = ({
    task,
    handleEditTask,
    handleToggleCompletion,
    handleDeleteTask,
}) => {
    return (
        <View style={styles.taskItem}>
            <View style={styles.taskTextContainer}>
                <Text
                    style={[
                        styles.taskText,
                        task.status === "Completed" &&
                        styles.completedTaskText,
                    ]}>
                    {task.title}
                </Text>
                <Text style={styles.taskDescription}>
                    Description: {task.description}
                </Text>

                {/* <Text style={styles.taskCreatedAt}>
                        Created: {task.createdAt}
                    </Text> */}
                <Text style={styles.taskStatus}>
                    Status: {task.status}
                </Text>
                <Text style={styles.taskDeadline}>
                    Deadline: {task.deadline}
                </Text>

            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => handleEditTask(task)}
                    style={[styles.editButton]}>
                    <Text style={styles.buttonText}>
                        Edit
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() =>
                        handleToggleCompletion(task.id)
                    }
                    style={[
                        styles.completeButton,
                        task.status === "Completed" &&
                        styles.completedButton,
                    ]}>
                    <Text style={styles.buttonText}>
                        {task.status === "Completed"
                            ? "Pending"
                            : "Completed"}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() =>
                        handleDeleteTask(task.id)
                    }
                    style={[styles.deleteButton]}>
                    <Text style={styles.buttonText}>
                        Delete
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default TaskItem;

const styles = StyleSheet.create({
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

});
