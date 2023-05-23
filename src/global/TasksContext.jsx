import { useState } from "react";
import { createContext } from "react";
import { config } from "./config";
import { browserStorage } from "./browserStorage";
export const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const processExistingTasks = () => {
    if (browserStorage.exists(config.storage.tasks)) {
      return browserStorage.get(config.storage.tasks);
    }
    return [];
  }
  const [tasks, setTasks] = useState(processExistingTasks());
  const setVars = (data) => {
    setTasks(data);
    browserStorage.set(config.storage.tasks, data);
  }
  const createNewTask = (taskName) => {
    let tasksClone = [...tasks];
    let filterFirstColumnTasks = tasksClone.filter(task => task.status === config.defaultColumnIndex);
    let newTask = {
      id: tasksClone.length + 1,
      title: taskName,
      status: config.defaultColumnIndex,
      sorting: filterFirstColumnTasks.length + 1
    }
    tasksClone.push(newTask);
    setVars(tasksClone)
  }
  return (
    <TasksContext.Provider value={{ 
      tasks,
      createNewTask
    }}>
      {children}
    </TasksContext.Provider>
  );
}