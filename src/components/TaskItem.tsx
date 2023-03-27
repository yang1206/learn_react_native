import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface Task {
  id: string;
  task: string;
  priority: string;
  dueDate: string;
  label: string;
}

interface TaskItemProps {
  task: Task;
  handleDeleteTask: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, handleDeleteTask }) => {
  return (
    <View style={styles.taskItem}>
      <Text style={styles.taskText}>{task.task}</Text>
      <Text style={styles.taskDetails}>
        Priority: {task.priority} | Due: {task.dueDate} | Label: {task.label}
      </Text>
      <TouchableOpacity onPress={() => handleDeleteTask(task.id)}>
        <Text style={styles.deleteButton}>X</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  taskItem: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
    shadowColor: '#000',
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