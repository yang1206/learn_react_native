// App.tsx
import React, { useState } from 'react'
import { Alert, StyleSheet, Text, Platform } from 'react-native'
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'
import { Provider } from 'mobx-react'
interface Task {
  id: string;
  task: string;
  priority: string;
  dueDate: string;
  label: string;
}
const App = () => {
  const [task, setTask] = useState<string>('')
  const [taskList, setTaskList] = useState<Task[]>([])

  const handleAddTask = (priority: string, dueDate: string, label: string) => {
    if (task.trim() === '') {
      Alert.alert('Please enter a non-empty task')
      return
    }
    setTaskList([
      ...taskList,
      {
        id: Math.random().toString(),
        task: task,
        priority: priority,
        dueDate: dueDate,
        label: label,
      },
    ])
    setTask('')
  }
  const handleDeleteTask = (id: string) => {
    setTaskList(taskList.filter(taskItem => taskItem.id !== id))
  }
  return (
      <SafeAreaProvider initialMetrics={initialWindowMetrics} style={styles.container}>
        <Text style={styles.title}>ToDo List</Text>
        <TaskInput task={task} setTask={setTask} handleAddTask={handleAddTask} />
        <TaskList taskList={taskList} handleDeleteTask={handleDeleteTask} />
      </SafeAreaProvider>
    
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    paddingHorizontal: Platform.OS === 'ios' ? 30 : 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#4A4A4A',
  },
})

export default App
