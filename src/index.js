import moment from 'moment';
import React, {useRef, useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import AddTaskModal from './components/AddTaskModal';
import {styles} from './index.styles';
import {storage} from './localStorage';
import TasksListModal from './components/TasksListModal';

const filters = ['All', 'Late', 'Today', 'Scheduled'];

const filterCalculations = {
  All: tasks => tasks.length,
  Late: tasks =>
    tasks.filter(task => moment(task.due).isBefore(moment())).length,
  Today: tasks =>
    tasks.filter(task => moment(task.due).isSame(moment(), 'day')).length,
  Scheduled: tasks =>
    tasks.filter(task => moment(task.due).isAfter(moment())).length,
};

const initialiseTasksFromStorage = () => {
  const tasks = storage.getString('tasks');
  return tasks ? JSON.parse(tasks) : [];
};

/**
 * AppContent component represents the main content of the application.
 * It includes the search functionality, filters, task list, and modals.
 *
 * @returns {JSX.Element} The rendered AppContent component.
 */

const AppContent = () => {
  const [modalVisible, setModalVisible] = useState(false),
    [tasksListModalVisible, setTasksListModalVisible] = useState(false),
    [tasks, setTasks] = useState(initialiseTasksFromStorage()),
    [search, setSearch] = useState({
      input: '',
      results: [],
    }),
    selectedFilterRef = useRef('');

  const calculateFiltersLength = filter =>
    filterCalculations[filter] ? filterCalculations[filter](tasks) : 0;

  const handleFilterPress = filter => {
    selectedFilterRef.current = filter;
    setTasksListModalVisible(true);
  };

  const handleReset = () => {
    storage.clearAll();
    setTasks([]);
  };

  const handleTasksListModalClose = () => {
    selectedFilterRef.current = '';
    setTasksListModalVisible(false);
  };

  const handleSearch = text => {
    setSearch({
      input: text,
      results: tasks.filter(task => task.name.indexOf(text) > -1),
    });
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Home</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search tasks"
          placeholderTextColor="black"
          value={search.input}
          onChangeText={handleSearch}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.filterTitle}>Filters</Text>
        {filters.map((filter, index) => (
          <TouchableOpacity
            key={index}
            style={styles.filterItemContainer}
            onPress={() => handleFilterPress(filter)}>
            <Text style={styles.filterItemText}>{filter}</Text>
            <Text style={styles.filterItemText}>
              {calculateFiltersLength(filter)}
            </Text>
          </TouchableOpacity>
        ))}

        {search.results.length > 0 && (
          <>
            <Text style={styles.filterTitle}>Search results</Text>
            {search.results.map((task, index) => (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}>
                <Text style={[styles.filterItemText, {marginRight: '3%'}]}>
                  {index + 1}
                </Text>
                <Text style={styles.filterItemText}>{task.name}</Text>
              </View>
            ))}
          </>
        )}

        <Text style={styles.addButton} onPress={() => setModalVisible(true)}>
          +
        </Text>

        <Text style={styles.resetButton} onPress={handleReset}>
          Reset storage and state
        </Text>
      </View>

      <AddTaskModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setTasks={setTasks}
      />

      {tasksListModalVisible && (
        <TasksListModal
          modalVisible={tasksListModalVisible}
          selectedFilter={selectedFilterRef.current}
          onModalClose={handleTasksListModalClose}
          tasks={tasks}
          setTasks={setTasks}
        />
      )}
    </>
  );
};

export default AppContent;
