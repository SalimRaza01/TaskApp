import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Modal, TextInput } from 'react-native';
import DatePicker from "react-native-modern-datepicker";
import { Picker } from '@react-native-picker/picker';

const { width, height } = Dimensions.get('window');

const TaskModal = ({
    modalVisible,
    task,
    setTask,
    handleAddTask,
    handleCancel,
    validationError,
}) => {

    const [tasks, setTasks] = useState([]);
    const [priority, setPriority] = useState(task && task.priority ? task.priority : '');

    return (
        <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={false}>
            <View style={styles.modalContainer}>
                <TextInput
                    style={[styles.input, { color: '#000', backgroundColor: '#fff' }]}
                    placeholderTextColor="#999"
                    placeholder="Title"
                    value={task && task.title ? task.title : ""}
                    onChangeText={(text) => setTask({ ...task, title: text })}
                />
                <TextInput
                    style={[styles.input, { color: '#000', backgroundColor: '#fff' }]}
                    placeholderTextColor="#999"
                    placeholder="Description"
                    value={task && task.description ? task.description : ""}
                    onChangeText={(text) =>
                        setTask({
                            ...task,
                            description: text
                        })} />

                <TextInput
                    style={[styles.input, { color: '#000', backgroundColor: '#fff' }]}
                    placeholder="Assign Task to"
                    placeholderTextColor="#999" />

                <Text style={styles.inputLabel}>
                    Set Deadline:
                </Text>
                <Picker
                    selectedValue={priority}
                    onValueChange={(itemValue, itemIndex) =>
                        setTask({ ...task, priority: itemValue })
                    }>

                    <Picker.Item label="High" value="High" />
                    <Picker.Item label="Medium" value="Medium" />
                    <Picker.Item label="Low" value="Low" />
                </Picker>

                <DatePicker
                    style={styles.datePicker}
                    mode="datepicker"
                    selected={task && task.deadline ? task.deadline : ""}
                    onDateChange={(date) =>
                        setTask({ ...task, deadline: date })} />

                {validationError && (
                    <Text style={styles.errorText}>Error: Please fill in the required fields</Text>
                )}

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: "#007BFF" }]}
                    onPress={handleAddTask}>
                    <Text style={styles.buttonText}>{task && task._id ? "Update" : "Add"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: "#FF3B30" }]}
                    onPress={handleCancel}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>

            </View>
        </Modal>
    );
};

export default TaskModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#FFFFFF",
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
        marginLeft: width * 0.02,
        borderWidth: 0.5,
        borderColor: "#ccc",
        padding: width * 0.02,
        marginBottom: height * 0.01,
        borderRadius: width * 0.02,
        fontSize: width * 0.03,
        width: width * 0.86
      },
    inputLabel: {
        marginTop: height * 0.01,
        marginLeft: width * 0.02,
        fontSize: width * 0.03,
        fontWeight: "bold",
    },
    errorText: {
        color: "#FF3B30",
        fontSize: width * 0.04,
        marginBottom: height * 0.02,
    },

});
