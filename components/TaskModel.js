import React from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    Modal,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from "react-native";
import DatePicker from "react-native-modern-datepicker";


const { width, height } = Dimensions.get('window');

const TaskModal = ({
    modalVisible,
    task,
    setTask,
    handleAddTask,
    handleCancel,
    validationError,
}) => {
    return (
        <Modal
            visible={modalVisible}
            animationType="slide"
            transparent={false}>
            <View style={styles.modalContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Title"
                    value={task.title}
                    onChangeText={(text) =>
                        setTask({ ...task, title: text })
                    } />
                <TextInput
                    style={styles.input}
                    placeholder="Description"
                    value={task.description}
                    onChangeText={(text) =>
                        setTask({
                            ...task,
                            description: text,
                        })
                    } />
                <Text style={styles.inputLabel}>
                    Deadline:
                </Text>
                <DatePicker
                    style={styles.datePicker}
                    mode="datepicker"
                    selected={task.deadline}
                    onDateChange={(date) =>
                        setTask({ ...task, deadline: date })
                    } />

                {validationError && (
                    <Text style={styles.errorText}>
                    </Text>
                )}
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: "#007BFF" }]}
                    onPress={handleAddTask}
                >
                    <Text style={styles.buttonText}>{task.id ? "Update" : "Add"}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: "#FF3B30" }]}
                    onPress={handleCancel}
                >
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>

            </View>
        </Modal>
    );
};

export default TaskModal;

const styles = StyleSheet.create({
    taskTime: {
        fontSize: width * 0.04,
        color: "#666",
    },
    button: {
        padding: width * 0.028,
        borderRadius: width * 0.03,
        marginTop: height * 0.01,
        alignItems: "center",
      },
      buttonText: {
        color: "#fff",
        fontSize: width * 0.05,
        fontWeight: "bold",
      },
    modalContainer: {
        flex: 1,
        padding: width * 0.05,
        backgroundColor: "#FFFFFF",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: width * 0.03,
        marginBottom: height * 0.02,
        borderRadius: width * 0.02,
        fontSize: width * 0.04,
    },
    inputLabel: {
        fontSize: width * 0.04,
        fontWeight: "bold",
    },
    errorText: {
        color: "#FF3B30",
        fontSize: width * 0.04,
        marginBottom: height * 0.02,
    },
});