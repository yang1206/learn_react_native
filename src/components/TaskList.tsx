import React from 'react'
import { FlatList } from 'react-native'
import TaskItem from './TaskItem'

interface Task {
  id: string;
  task: string;
  priority: string;
  dueDate: string;
  label: string;
}

interface TaskListProps {
  taskList: Task[];
  handleDeleteTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ taskList, handleDeleteTask }) => {
  return (
    <FlatList
      data={taskList}
      renderItem={({ item }) => (
        <TaskItem task={item} handleDeleteTask={handleDeleteTask} />
      )}
      keyExtractor={item => item.id}
    />
  )
}

export default TaskList
