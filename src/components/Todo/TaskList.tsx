import React from 'react'
import { FlashList } from '@shopify/flash-list'
import { View } from 'react-native'
import { useStore } from '../../store'
import TaskItem from './TaskItem'

const TaskList: React.FC = () => {
  const { todos } = useStore()
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
