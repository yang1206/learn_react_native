import { StyleSheet, Text, View } from 'react-native'
import TaskList from '../components/TaskList'
import TaskInput from '../components/TaskInput'
import { navigate } from '../navigation'
export default function Home() {
  return (
    <View style={styles.container}>
      <Text className="text-sky-500 text-[10vw]" onPress={() => { navigate('About') }}>关于</Text>
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
