import { StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import TaskList from '../components/TaskList'
import TaskInput from '../components/TaskInput'
import { SafeAreaScrollView } from '../components/SafeAreaScrollView'
// import { Switch } from 'react-native-gesture-handler'
import { navigate } from '@/navigation'
export default function Home() {
  const [is, setIs] = useState(false)
  return (
    <SafeAreaScrollView>
      <View style={styles.container}>
        {/* <Switch  onValueChange={(value)=>{setIs(value)}} value={is}  /> */}
        <Text style={{ fontSize: 18 }} onPress={() => { navigate('About') }}>关于</Text>
        <TaskInput />
        <TaskList />
      </View>
    </SafeAreaScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
})
