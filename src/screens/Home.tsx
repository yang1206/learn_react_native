import { StyleSheet, Text, View, Switch } from 'react-native'
import TaskList from '../components/TaskList'
import TaskInput from '../components/TaskInput'
import { SafeAreaScrollView } from '../components/SafeAreaScrollView'
// import { Switch } from 'react-native-gesture-handler'
import { useState } from 'react'
export default function Home() {
  const [is,setIs] = useState(false)
  return (
    <SafeAreaScrollView>
      <View style={styles.container}>
        <Switch  onValueChange={(value)=>{setIs(value)}} value={is}  />
        <Text style={{ fontSize: 18 }} >关于</Text>
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
