import { StyleSheet, Text, View } from 'react-native'
import TaskList from '../components/Todo/TaskList'
import TaskInput from '../components/Todo/TaskInput'
import { navigate } from '../navigation'

export default function Home() {
  return (
      <View style={styles.container}>
        <Text className="text-xl text-sky-500" onPress={() => { navigate('About') }}>关于</Text>
        <TaskInput />
        <TaskList />
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
})
