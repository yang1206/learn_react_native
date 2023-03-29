import React from 'react'
import { FlatList } from 'react-native'
import { useStore } from '../store'
import TaskItem from './TaskItem'

const TaskList: React.FC = () => {
  const { todos } = useStore()
  return (

    <>
      <FlatList
        nestedScrollEnabled={true}
        data={todos}
        renderItem={({ item }) => (
          <TaskItem task={item} />
        )}
        keyExtractor={item => item.id}
      />
   </>

  )
}

export default TaskList
