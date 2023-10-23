import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import TaskModal from './TaskModal';

const AddTaskScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [task, setTask] = useState({
    title: '',       
    description: '',
    status: 'Pending',
    deadline: '',
    createdAt: '',
  });

  const handleAddTask = () => {
    // Implement the logic to add the task
    // You can use the 'task' object here to send data to your server or state management
    // You can also set validationError if needed
  };

  const handleCancel = () => {
    // Implement the logic to cancel task creation/edit
    setModalVisible(false);
  };

  return (
    <View>
      <Button
        title="Open Task Modal"
        onPress={() => setModalVisible(true)}
      />
      <TaskModal
        modalVisible={isModalVisible}
        task={task} 
        setTask={setTask}
        handleAddTask={handleAddTask}
        handleCancel={handleCancel}
        validationError={false}  
      />
    </View>
  );
};

export default AddTaskScreen;

