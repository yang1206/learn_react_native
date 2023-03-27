import { types } from "mobx-state-tree"

const Todo = types
  .model("Todo", {
    id: types.identifier,
    task: types.string,
    priority: types.string,
    dueDate: types.string,
    label: types.string,
  })
  .actions((self) => ({
    togglePriority() {
      self.priority = self.priority === "High" ? "Low" : "High"
    },
  }))

export default Todo
