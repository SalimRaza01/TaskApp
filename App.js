import React, { useState, useEffect } from 'react';
import Realm from 'realm';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import TaskList from './components/TaskList';
import TaskModal from './components/TaskModel';
import 'react-native-get-random-values';

const { width, height } = Dimensions.get('window');

const TaskSchema = {
  name: 'Task',
  properties: {
    id: 'int',
    title: 'string',
    description: 'string',
    status: 'string',
    deadline: 'string',
    createdAt: 'string',
  },
  primaryKey: 'id',
};

const App = () => {
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
      const realm = await Realm.open({
        path: 'myrealm',
        schema: [TaskSchema],
        deleteRealmIfMigrationNeeded: true,
      });
      setRealm(realm);

      const tasksFromRealm = realm.objects('Task');
      setTasks([...tasksFromRealm]);

      tasksFromRealm.addListener(() => {
        setTasks([...tasksFromRealm]);
      });
    })();
  }, []);

  const handleAddTask = () => {
    realm.write(() => {
      const newTask = {
        id: Date.now(),
        ...task,
      };
      realm.create('Task', newTask);
    });

    setModalVisible(false);
    setValidationError(false);
  };

  const handleEditTask = () => {
    if (!editingTask) {
      console.error('No task selected for editing');
      return;
    }
    realm.write(() => {
      const updatedTask = realm.objectForPrimaryKey('Task', editingTask.id);
      updatedTask.title = task.title;
      updatedTask.description = task.description;
      updatedTask.status = task.status;
      updatedTask.deadline = task.deadline;
      updatedTask.createdAt = task.createdAt;
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
        handleEditTask={(task) => {
          setEditingTask(task);
          setTask(task);
          setModalVisible(true);
        }}
        handleToggleCompletion={handleToggleCompletion}
        handleDeleteTask={handleDeleteTask}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setEditingTask(null);
          setTask({
            title: '',
            description: '',
            status: 'Pending',
            deadline: '',
            createdAt: '',
          });
          setModalVisible(true);
          setValidationError(false);
        }}>
        <Text style={styles.addButtonText}>
          {editingTask ? 'Edit Task' : 'Add Task'}
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
            title: '',
            description: '',
            status: 'Pending',
            deadline: '',
            createdAt: '',
          });
          setModalVisible(false);
          setValidationError(false);
        }}
        validationError={validationError}
        handleEditTask={handleEditTask} // Pass handleEditTask to TaskModal
      />
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