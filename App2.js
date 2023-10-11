import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from "react-native";
import TaskList from "./components/TaskList";
import TaskModal from "./components/TaskModel";

const { width, height } = Dimensions.get('window');

const App = () => {

    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState({
        title: "",
        description: "",
        status: "Pending",
        deadline: "",
        createdAt: "",
    });
    const [modalVisible, setModalVisible] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [validationError, setValidationError] = useState(false);
    const handleAddTask = () => {
        if (
            task.title.trim() !== "" &&
            task.deadline !== ""
        ) {
            const currentDate = new Date();
            const formattedDate =
                currentDate.toLocaleString();
            if (editingTask) {
                const updatedTasks = tasks.map((t) =>
                    t.id === editingTask.id
                        ? { ...t, ...task }
                        : t
                );
                setTasks(updatedTasks);
                setEditingTask(null);
            } else {
                const newTask = {
                    id: Date.now(),
                    ...task,
                    createdAt: formattedDate,
                };
                setTasks([...tasks, newTask]);
            }
            setTask({
                title: "",
                description: "",
                status: "Pending",
                deadline: "",
                createdAt: "",
            });
            setModalVisible(false);
            setValidationError(false);
        } else {
            setValidationError(true);
        }
    };
    const handleEditTask = (task) => {
        setEditingTask(task);
        setTask(task);
        setModalVisible(true);
    };
    
    const handleDeleteTask = (taskId) => {
        const updatedTasks = tasks.filter(
            (t) => t.id !== taskId
        );
        setTasks(updatedTasks);
    };
    const handleToggleCompletion = (taskId) => {
        const updatedTasks = tasks.map((t) =>
            t.id === taskId
                ? {
                    ...t,
                    status:
                        t.status === "Pending"
                            ? "Completed"
                            : "Pending",
                }
                : t
        );
        setTasks(updatedTasks);
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

export default App;

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
});