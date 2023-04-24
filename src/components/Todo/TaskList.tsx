import React from 'react'
import { FlashList } from '@shopify/flash-list'
import { View } from 'react-native'
import TaskItem from './TaskItem'
import { useTodoStore } from '@/store'

const TaskList: React.FC = () => {
  const { todos } = useTodoStore()
  return (

    <View className="w-[80vw] h-[50vh]">
      <FlashList
        nestedScrollEnabled={true}
        data={todos}
        estimatedItemSize={412}
        renderItem={({ item }) => (
          <TaskItem task={item} />
        )}
        keyExtractor={item => item.id}
      />
    </View>

  )
}

export default TaskList
