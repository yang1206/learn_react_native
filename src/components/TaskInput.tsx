import React, { useState } from 'react'
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { format } from 'date-fns'
import DropDownPicker from 'react-native-dropdown-picker'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { useStore } from '../store'
const TaskInput = () => {
  const [priority, setPriority] = useState<string>('Low')
  const [dueDate, setDueDate] = useState<string>('')
  const [label, setLabel] = useState<string>('')
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false)
  const [open, setOpen] = useState(false)
  const [task, setTask] = useState<string>('')
  const [items, setItems] = useState([
    { label: 'Low', value: 'Low' },
    { label: 'Medium', value: 'Medium' },
    { label: 'High', value: 'High' },
  ])
  const handleDateChange = (date: Date) => {
    // Alert.alert(new Date(date).getDate().toString())

    if (date) {
      const formattedDate = format(date, 'yyyy-MM-dd')
      setDueDate(formattedDate)
    }
    setShowDatePicker(false)
  }
  const { addTodo } = useStore()
  const handleAddTodo = () => {
    if (task.trim() === '') {
      Alert.alert('Please enter a non-empty task')
      return
    }
    const newTodo = {
      id: Math.random().toString(),
      task,
      priority,
      dueDate,
      label,
    }
    addTodo(newTodo)
    setTask('')
    setPriority('')
    setDueDate('')
    setLabel('')
  }

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={setTask}
        value={task}
        placeholder="Add a task"
      />
      <DropDownPicker
        items={items}
        value={priority}
        open={open}
        setOpen={setOpen}
        containerStyle={styles.dropdownContainer}
        style={styles.dropdown}
        labelStyle={styles.dropdownItem}
        dropDownContainerStyle={styles.dropdown}
        setValue={setPriority}
        setItems={setItems}
        zIndex={9000}
      />
      <TextInput
        style={styles.input}
        onPressIn={() => setShowDatePicker(true)}
        value={dueDate}
        placeholder="Due date (yyyy-mm-dd)"
        editable={true}
      />

      <DateTimePickerModal
        isVisible={showDatePicker}
        date={dueDate ? new Date(dueDate) : new Date()}
        mode="date"
        // display="default"
        onConfirm={handleDateChange}
        onCancel={() => { setShowDatePicker(false) }}
      />

      <TextInput
        style={styles.input}
        onChangeText={setLabel}
        value={label}
        placeholder="Label"
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
        <Text style={styles.addButtonText}>增加</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: '#BDBDBD',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  dropdownContainer: {
    height: 40,
    marginBottom: 20,
    zIndex: 1000, // 添加 zIndex 属性
  },
  dropdown: {
    backgroundColor: 'white',
    borderColor: '#BDBDBD',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 30,
  },
  dropdownItem: {
    justifyContent: 'flex-start',
  },

  datePicker: {
    height: Platform.OS === 'ios' ? 200 : 50,
    marginBottom: 10,
    borderColor: '#BDBDBD',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  picker: {
    height: Platform.OS === 'ios' ? 200 : 50,
    marginBottom: 10,
    borderColor: '#BDBDBD',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  addButton: {
    backgroundColor: '#2196F3',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    marginBottom: 20,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
})

export default TaskInput
