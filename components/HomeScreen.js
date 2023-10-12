import React, { useState, useEffect } from 'react';
import Realm from 'realm';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import TaskList from './TaskList';
import TaskModal from './TaskModel';

const { width, height } = Dimensions.get('window');

const TaskSchema = {
  name: 'Task',
  properties: {
    _id: 'objectId',
    title: 'string',
    description: 'string',
    status: 'string',
    deadline: 'string',
    createdAt: 'string',
  },
  primaryKey: '_id',
};

const HomeScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'Pending',
    deadline: '',
    createdAt: '',
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [validationError, setValidationError] = useState(false);
  const [realm, setRealm] = useState(null);

  useEffect(() => {
    (async () => {
      const app = new Realm.App({ id: 'devicesync-danli' }); // Replace with your Realm app ID
//last authenticated user 65278d98c4bf985fcce185d1
      // Authenticate the user (e.g., using anonymous authentication)
      const credentials = Realm.Credentials.anonymous();

      try {
        const user = await app.logIn(credentials);
        console.log('Successfully authenticated as:', user.id);

        // Proceed to set up sync configuration
        const config = {
          sync: {
            user,
            partitionValue: `user=${user.id}`, // Assuming user.id is a UUID
          },
          schema: [TaskSchema],
        };

        const realm = await Realm.open(config);
        setRealm(realm);

        const tasksFromRealm = realm.objects('Task');
        setTasks([...tasksFromRealm]);

        tasksFromRealm.addListener(() => {
          setTasks([...tasksFromRealm]);
        });
      } catch (error) {
        console.error('Error authenticating:', error);
      }
    })();
  }, []);

  const handleAddTask = () => {
    const newTask = {
      _id: new Realm.BSON.ObjectId(),  // Generate a new ObjectId
      title: task.title,
      description: task.description,
      status: task.status,
      deadline: task.deadline,
      createdAt: task.createdAt,
    };
  
    realm.write(() => {
      realm.create('Task', newTask);
    });
    setModalVisible(false);
    setValidationError(false);
  };
  

  const handleEditTask = () => {
    const updatedTask = { ...editingTask, ...task, id: editingTask.id }; // Ensure id is set

    realm.write(() => {
      realm.create('Task', updatedTask, 'modified');
    });
    setModalVisible(false);
  };


  const handleDeleteTask = (taskId) => {
    realm.write(() => {
      const taskToDelete = realm.objectForPrimaryKey('Task', taskId);
      realm.delete(taskToDelete);
    });
  };

  const handleToggleCompletion = (taskId) => {
    realm.write(() => {
      const taskToToggle = realm.objectForPrimaryKey('Task', taskId);
      taskToToggle.status = taskToToggle.status === 'Pending' ? 'Completed' : 'Pending';
    });
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

export default HomeScreen;

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