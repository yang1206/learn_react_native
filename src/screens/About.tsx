import { styled, useColorScheme } from 'nativewind'
import React from 'react'
import { Pressable, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { SafeAreaScrollView } from '../ui/core/safearea-scrollview'

export function About() {
  const StyledPressable = styled(Pressable)
  const StyledText = styled(Text)
  const { colorScheme, toggleColorScheme } = useColorScheme()

  return (
    <SafeAreaScrollView>
      <StyledPressable

        className="flex-1 items-center justify-center pt-3 dark:bg-slate-800"
      >
        <StyledText
          selectable={false}
          onPress={toggleColorScheme}
          className="dark:text-white"
        >
          {`Try clicking me! ${colorScheme === 'dark' ? '🌙' : '🌞'}`}
        </StyledText>

      <View style={styles.container}>
        <StyledText
          selectable={false}
          className="dark:text-white"
        >
          {`Try clicking me! ${colorScheme === 'dark' ? '🌙' : '🌞'}`}
        </StyledText>
        <Text style={styles.title}>About This App</Text>
        <Text style={styles.text}>
          This is a simple todo app built with React Native and MobX.
        </Text>
        <Text style={styles.text}>
          It allows you to add, edit, and delete tasks, as well as sort them by
          task, priority, due date, or label.
        </Text>
        <Text style={styles.text}>Created by [Your Name]</Text>
        <Text style={styles.subtitle}>Features:</Text>
        <View style={styles.feature}>
          <Text style={styles.featureText}>Add, edit, and delete tasks</Text>
        </View>
        <View style={styles.feature}>
          <Text style={styles.featureText}>Sort tasks by task, priority, due date, or label</Text>
        </View>
        <View style={styles.feature}>
          <Text style={styles.featureText}>Mark tasks as completed</Text>
        </View>
        <View style={styles.feature}>
          <TouchableHighlight>
            <Text style={styles.featureText}>
              View completed tasks
            </Text></TouchableHighlight>
        </View>
          <Text style={styles.text}>Created by [Your Name]</Text>
          <Text style={styles.subtitle}>Features:</Text>
          <View style={styles.feature}>
            <Text style={styles.featureText}>Add, edit, and delete tasks</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureText}>Sort tasks by task, priority, due date, or label</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureText}>Mark tasks as completed</Text>
          </View>
          <View style={styles.feature}>
            <TouchableHighlight>
              <Text style={styles.featureText}>
                View completed tasks
              </Text></TouchableHighlight>
          </View>
          <Text style={styles.text}>Created by [Your Name]</Text>
          <Text style={styles.subtitle}>Features:</Text>
          <View style={styles.feature}>
            <Text style={styles.featureText}>Add, edit, and delete tasks</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureText}>Sort tasks by task, priority, due date, or label</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureText}>Mark tasks as completed</Text>
          </View>
          <View style={styles.feature}>
            <TouchableHighlight>
              <Text style={styles.featureText}>
                View completed tasks
              </Text></TouchableHighlight>
          </View>
      </View>
      </StyledPressable>
    </SafeAreaScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 100,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#555',
  },
})

export default About
