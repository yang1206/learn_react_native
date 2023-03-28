import React from 'react'
import {  FlatList, ScrollView } from 'react-native'
import TaskItem from './TaskItem'
import { useStore } from '../store'



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
