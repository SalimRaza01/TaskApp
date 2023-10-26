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
    const [priority, setPriority] = useState(task && task.priority ? task.priority : "medium");

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
                    value={task && task.description ? task.description : ""}
                    onChangeText={(text) =>
                        setTask({
                            ...task,
                            description: text
                        })
                    } />
                <Text style={styles.inputLabel}>
                    Deadline:
                </Text>
                <Picker
                    selectedValue={priority}
                    onValueChange={(itemValue, itemIndex) =>
                        setTask({ ...task, priority: itemValue })
                    }
                >
                    <Picker.Item label="High" value="high" />
                    <Picker.Item label="Medium" value="medium" />
                    <Picker.Item label="Low" value="low" />
                </Picker>
                <DatePicker
                    style={styles.datePicker}
                    mode="datepicker"
                    selected={task && task.deadline ? task.deadline : ""}
                    onDateChange={(date) =>
                        setTask({ ...task, deadline: date })
                    } />
                {validationError && (
                    <Text style={styles.errorText}>
                    </Text>
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

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
//   Modal,
//   TextInput,
// } from 'react-native';
// import DatePicker from 'react-native-modern-datepicker';
// import { Picker } from '@react-native-picker/picker';
// import axios from 'axios';

// const { width, height } = Dimensions.get('window');

// const TaskModal = ({ route }) => {

//     const BASE_URL = 'http://10.0.2.2:3000';

//   const [tasks, setTasks] = useState([]);
//   const [task, setTask] = useState({
//     title: '',
//     description: '',
//     status: 'Pending',
//     deadline: '',
//     createdAt: '',
//     priority: 'medium',
//   });
//   const [modalVisible, setModalVisible] = useState(false);
//   const [validationError, setValidationError] = useState(false);

//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

//   const priority = task && task.priority ? task.priority : 'medium';

//   const handleAddTask = () => {

//     if (!task.title || !task.deadline) {
//       setValidationError(true);
//       return;
//     }

//     const updatedTask = {
//       ...task,
//       createdAt: new Date().toLocaleString(),
//       ...route.params,
//     };

//     const updatedTaskStringified = JSON.stringify(updatedTask);

//     axios.post(`${BASE_URL}/send-data`, updatedTaskStringified, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer YourAuthTokenHere',
//       },
//     })
//       .then(response => {
//         setModalVisible(false);
//         setTask({
//           title: "",
//           description: "",
//           status: "Pending",
//           deadline: "",
//           createdAt: "",
//           priority: "",
//         });
//         setTasks([...tasks, response.data]);
//       })
//       .catch(error => console.error('Error adding data:', error));
//   };

//   const handleEditTask = (taskId) => {
//     console.log('Task being edited:', task);
//     if (!task._id) {
//       console.error('Task ID is missing.');
//       return;
//     }

//     const updatedTask = {
//       ...task,
//       _id: task._id,
//     };

//     axios.put(`${BASE_URL}/update/${task._id}`, updatedTask, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then(response => {
//         setModalVisible(false);
//         const updatedTasks = tasks.map(t => (t._id === task._id ? response.data : t));
//         setTasks(updatedTasks);
//       })
//       .catch(error => console.error('Error updating task:', error));
//   };

//   const handleToggleCompletion = (taskId) => {
//     const updatedTasks = tasks.map(t => {
//       if (t._id === taskId) {
//         return { ...t, status: t.status === 'Pending' ? 'Completed' : 'Pending' };
//       }
//       return t;
//     });

//     axios.put(`${BASE_URL}/update/${taskId}`, updatedTasks.find(t => t._id === taskId))
//       .then(() => {
//         setTasks(updatedTasks);
//       })
//       .catch(error => console.error('Error toggling task completion:', error));
//   };

//   const handleDeleteTask = (taskId) => {
//     axios.delete(`${BASE_URL}/delete/${taskId}`)
//       .then(() => {
//         setTasks(tasks.filter(t => t._id !== taskId));
//       })
//       .catch(error => console.error('Error deleting task:', error));
//   };

//   const handleCancel = () => {
//     if (task._id) {
//       setTask({
//         title: '',
//         description: '',
//         status: 'Pending',
//         deadline: '',
//         createdAt: '',
//         priority: '',
//       });
//     } else {
//       setModalVisible(false);
//       setValidationError(false);
//     }
//   };

//   const formatDeadline = (deadline) => {
//     const date = new Date(deadline);
//     const day = date.getDate().toString().padStart(2, '0');
//     const options = { month: 'short' };
//     const monthName = new Intl.DateTimeFormat('en-US', options).format(date);
//     const formattedDeadline = `${day} ${monthName}`;
//     return { day, monthName, formattedDeadline };
//   };

//   const formatCreatedAt = (createdAt) => {
//     const date = new Date(createdAt);
//     const day = date.getDate().toString().padStart(2, '0');
//     const options = { month: 'short' };
//     const dayName = new Intl.DateTimeFormat('en-US', options).format(date);
//     return { day, dayName };
//   };

//   return (
//     <View style={styles.container}>
//       <Modal visible={modalVisible} animationType="slide" transparent={false}>
//         <View style={styles.modalContainer}>
//           <TextInput
//             style={[styles.input, { color: '#000', backgroundColor: '#fff' }]}
//             placeholderTextColor="#999"
//             placeholder="Title"
//             value={task && task.title ? task.title : ''}
//             onChangeText={(text) => setTask({ ...task, title: text })}
//           />
//           <TextInput
//             style={[styles.input, { color: '#000', backgroundColor: '#fff' }]}
//             placeholderTextColor="#999"
//             value={task && task.description ? task.description : ''}
//             onChangeText={(text) => setTask({ ...task, description: text })}
//           />
//           <Text style={styles.inputLabel}>Deadline:</Text>
//           <Picker
//             selectedValue={priority}
//             onValueChange={(itemValue, itemIndex) =>
//               setTask({ ...task, priority: itemValue })
//             }>
//             <Picker.Item label="High" value="high" />
//             <Picker.Item label="Medium" value="medium" />
//             <Picker.Item label="Low" value="low" />
//           </Picker>
//           <DatePicker
//             style={styles.datePicker}
//             mode="datepicker"
//             selected={task && task.deadline ? task.deadline : ''}
//             onDateChange={(date) => setTask({ ...task, deadline: date })}
//           />
//           {validationError && <Text style={styles.errorText}></Text>}
//           <TouchableOpacity
//             style={[styles.button, { backgroundColor: '#007BFF' }]}
//             onPress={handleAddTask}>
//             <Text style={styles.buttonText}>
//               {task && task._id ? 'Update' : 'Add'}
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.button, { backgroundColor: '#FF3B30' }]}
//             onPress={handleCancel}>
//             <Text style={styles.buttonText}>Cancel</Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>
//       <TouchableOpacity
//         style={[styles.button, { backgroundColor: '#007BFF' }]}
//         onPress={() => setModalVisible(true)}>
//         <Text style={styles.buttonText}>Add Task</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default TaskModal;


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
