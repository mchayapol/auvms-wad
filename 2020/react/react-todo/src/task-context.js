import * as React from 'react'

export const TaskContext = React.createContext({
  tasks: [],
  addTask: () => {},
});