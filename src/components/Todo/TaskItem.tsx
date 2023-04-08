import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useStore } from '../../store'
import type { Todo } from '../../store/TodoSlice'

const TaskItem: React.FC<{ task: Todo }> = ({ task }) => {
  const { removeTodo } = useStore()

  const handleRemoveTodo = () => {
    removeTodo(task.id)
  }
  return (
    <View className="mb-[10] flex-col items-start justify-between rounded-lg bg-white px-[20] py-[15] shadow-black" style={styles.taskItem}>
      <Text style={styles.taskText}>{task.task}</Text>
      <Text style={styles.taskDetails}>
        Priority: {task.priority} | Due: {task.dueDate} | Label: {task.label}
      </Text>
      <TouchableOpacity onPress={() => handleRemoveTodo()}>
        <Text style={styles.deleteButton}>X</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  taskItem: {
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  taskText: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  taskDetails: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 5,
  },
  deleteButton: {
    alignSelf: 'flex-end',
    color: 'red',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 5,
  },
})

export default TaskItem
