import {FlashList} from '@shopify/flash-list';
import moment from 'moment';
import React, {useState} from 'react';
import {
  Alert,
  Button,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './TasksListModal.styles';
import {storage} from '../localStorage';

const initialiseTasksList = (tasks, selectedFilter) => {
  switch (selectedFilter) {
    case 'All':
      return tasks;
    case 'Late':
      return tasks.filter(task => moment(task.due).isBefore(moment()));
    case 'Today':
      return tasks.filter(task => moment(task.due).isSame(moment(), 'day'));
    case 'Scheduled':
      return tasks.filter(task => moment(task.due).isAfter(moment()));
    default:
      return tasks;
  }
};

const calculatePendingAndCompletedTasks = tasks => {
  const pendingTasks = tasks.filter(task => !task.completed),
    completedTasks = tasks.filter(task => task.completed);

  return {pendingTasks, completedTasks};
};

/**
 * Renders a modal component that displays a list of tasks.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.modalVisible - Indicates whether the modal is visible.
 * @param {string} props.selectedFilter - The selected filter for the tasks.
 * @param {function} props.onModalClose - The function to handle modal close event.
 * @param {Array} props.tasks - The array of tasks.
 * @param {function} props.setTasks - The function to update the tasks.
 * @returns {JSX.Element} The rendered modal component.
 */
const TasksListModal = props => {
  const {modalVisible, selectedFilter, onModalClose, tasks, setTasks} = props,
    [filterTasks, setFilterTasks] = useState(
      initialiseTasksList(tasks, selectedFilter),
    ),
    {pendingTasks, completedTasks} =
      calculatePendingAndCompletedTasks(filterTasks);

  const renderItem = (item, index, showCheckbox = false) => (
    <TouchableOpacity
      style={styles.listItemContainer}
      activeOpacity={showCheckbox ? 0.5 : 1}
      onPress={() => {
        if (showCheckbox) {
          Alert.alert(
            'Complete task',
            'Are you sure you want to complete this task?',
            [
              {
                text: 'No',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'Yes',
                onPress: () => {
                  const updatedTasks = tasks.map(task => {
                    if (task.id === item.id) {
                      return {...task, completed: true};
                    }
                    return task;
                  });

                  setFilterTasks(
                    initialiseTasksList(updatedTasks, selectedFilter),
                  );

                  setTasks(updatedTasks);
                  storage.set('tasks', JSON.stringify(updatedTasks));
                },
              },
            ],
          );
        }
      }}>
      <Text style={styles.listItemIndex}>{index + 1}</Text>
      <Text style={styles.listItemName}>{item.name}</Text>
      <Text style={styles.listItemDue}>
        {moment(item.due).format('DD/MM/YYYY')} -{' '}
        {moment(item.due).format('HH:mm')}
      </Text>
    </TouchableOpacity>
  );

  const keyExtractor = (item, i) => item.id;

  const headerComponent = text => (
    <Text style={styles.headerComponentText}>{text}</Text>
  );

  const emptyListComponent = () => (
    <Text style={styles.emptyListComponentText}>No tasks</Text>
  );

  const sortTasks = () => {
    const sortedTasks = filterTasks.sort(
      (a, b) => new Date(a.due) - new Date(b.due),
    );
    setFilterTasks([...sortedTasks]);
  };

  const deleteAllCompletedTasks = () => {
    if (!tasks.filter(task => task.completed).length) {
      return;
    }

    Alert.alert(
      'Delete all completed tasks',
      'Are you sure you want to delete all completed tasks?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            const updatedTasks = tasks.filter(task => !task.completed);
            setFilterTasks(initialiseTasksList(updatedTasks, selectedFilter));

            setTasks(updatedTasks);
            storage.set('tasks', JSON.stringify(updatedTasks));
          },
        },
      ],
    );
  };

  return (
    <Modal visible={modalVisible} animationType="slide" transparent={true}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{selectedFilter}</Text>
          <Pressable onPress={onModalClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </Pressable>
        </View>
        <View style={{flex: 1}}>
          <Button
            style={styles.headerComponentText}
            title="Sort by due date"
            onPress={sortTasks}
          />

          <Button
            style={styles.headerComponentText}
            title="Delete all completed tasks"
            onPress={deleteAllCompletedTasks}
          />

          <FlashList
            data={pendingTasks}
            keyExtractor={keyExtractor}
            renderItem={({item, index}) => renderItem(item, index, true)}
            ListHeaderComponent={() => headerComponent('Pending')}
            ListEmptyComponent={emptyListComponent}
            estimatedItemSize={60}
          />

          <FlashList
            data={completedTasks}
            keyExtractor={keyExtractor}
            renderItem={({item, index}) => renderItem(item, index)}
            ListHeaderComponent={() => headerComponent('Completed')}
            ListEmptyComponent={emptyListComponent}
            estimatedItemSize={60}
          />
        </View>
      </View>
    </Modal>
  );
};

export default TasksListModal;
