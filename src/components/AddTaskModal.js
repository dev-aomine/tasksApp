import moment from 'moment';
import React, {useState} from 'react';
import {
  Alert,
  Button,
  Modal,
  Pressable,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {storage} from '../localStorage';
import {generateId} from '../utils/idGenerator';
import {styles} from './AddTaskModal.styles';

// Define the AddTaskModal component
const AddTaskModal = props => {
  // Define state variables
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const {modalVisible, setModalVisible, setTasks} = props;
  const [taskName, setTaskName] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);

  // Toggle the switch state
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  // Handle the save button click event
  const handleSave = () => {
    if (!taskName) {
      Alert.alert('Task name is required');
      return;
    }

    setTasks(prevTasks => {
      const newTasks = [
        ...prevTasks,
        {
          id: generateId(),
          name: taskName,
          due: date,
          completed: isEnabled,
        },
      ];

      // Save tasks to local storage
      storage.set('tasks', JSON.stringify(newTasks));
      return newTasks;
    });

    // Reset input fields and modal state
    setTaskName('');
    setDate(new Date());
    setModalVisible(false);
    setIsEnabled(false);
  };

  // Render the AddTaskModal component
  return (
    <Modal visible={modalVisible} animationType="slide" transparent={true}>
      <Pressable
        style={styles.modalContainer}
        onPress={() => setModalVisible(false)}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add task</Text>

          <Text style={styles.label}>Task name</Text>
          <TextInput
            style={styles.input}
            value={taskName}
            onChangeText={setTaskName}
            numberOfLines={3}
          />

          <Text style={styles.label}>
            Due -{' '}
            {moment(date).format('DD/MM/YYYY') +
              ' ' +
              moment(date).format('HH:mm')}
          </Text>
          <Button title="Choose date and time" onPress={() => setOpen(true)} />
          <DatePicker
            modal
            open={open}
            date={date}
            onConfirm={date => {
              setOpen(false);
              setDate(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />

          <View style={styles.switchContainer}>
            <Text style={styles.label}>Completed (green) or due (red)</Text>
            <Switch
              trackColor={{false: '#E6E6E6', true: '#E6E6E6'}}
              thumbColor={isEnabled ? '#00FF7D' : '#FF0000'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <Button title="Save" onPress={handleSave} />
        </View>
      </Pressable>
    </Modal>
  );
};

export default AddTaskModal;
