import React from "react"
import { Text, View, StyleSheet } from "react-native"
import { SafeAreaScrollView } from '../components/SafeAreaScrollView'
const About = () => {
  return (
    <SafeAreaScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>About This App</Text>
        <Text style={styles.text}>
          This is a simple todo app built with React Native and MobX.
        </Text>
        <Text style={styles.text}>
          It allows you to add, edit, and delete tasks, as well as sort them by
          task, priority, due date, or label.
        </Text>
        <Text style={styles.text}>Created by [Your Name]</Text>
      </View>
    </SafeAreaScrollView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
})

export default About
