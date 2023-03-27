import React, { useState } from 'react'
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Platform,
} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import DateTimePicker from '@react-native-community/datetimepicker'
interface TaskInputProps {
  task: string;
  setTask: (task: string) => void;
  handleAddTask: (priority: string, dueDate: string, label: string) => void;
}
const TaskInput: React.FC<TaskInputProps> = ({
  task,
  setTask,
  handleAddTask,
}) => {
  const [priority, setPriority] = useState<string>('Low')
  const [dueDate, setDueDate] = useState<string>('')
  const [label, setLabel] = useState<string>('')
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false)
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState([
    { label: 'Low', value: 'Low' },
    { label: 'Medium', value: 'Medium' },
    { label: 'High', value: 'High' },
  ])
  const onAddTask = () => {
    handleAddTask(priority, dueDate, label)
    setPriority('Low')
    setDueDate('')
    setLabel('')
  }
  const handleDateChange = (event: Event, selectedDate?: Date) => {
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0]
      setDueDate(formattedDate)
    }
    setShowDatePicker(false)
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
      />
      <TextInput
        style={styles.input}
        onFocus={() => setShowDatePicker(true)}
        value={dueDate}
        placeholder="Due date (yyyy-mm-dd)"
      // editable={true}
      />
      {showDatePicker && (
        <DateTimePicker
          value={dueDate ? new Date(dueDate) : new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <TextInput
        style={styles.input}
        onChangeText={setLabel}
        value={label}
        placeholder="Label"
      />
      <TouchableOpacity style={styles.addButton} onPress={onAddTask}>
        <Text style={styles.addButtonText}>Add</Text>
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
    marginBottom:30
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
