import * as React from 'react'
import './App.css';
import ToDoForm from './ToDoForm';
import TaskList from './TaskList';
import { TaskContext } from './task-context';
import { useLocalStorage } from "./useLocalStorage";

function App() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);

  const addTask = (name) => {
    console.log(`addTask: `, name);
    const newTask = {
      name: name,
      status: false
    }
    setTasks([...tasks, newTask])
    console.log("tasks", tasks)
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask }}>
      <div className="App">
        <ToDoForm />
        <TaskList tasks={tasks} />
      </div>
    </TaskContext.Provider>
  );
}

export default App;
