import { useState, useEffect } from "react";
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
  const [tempTaskId, setTempTaskId] = useState(null);
  const [tempTaskStatus, setTempTaskStatus] = useState(null);
  const [tempTaskSort, setTempTaskSort] = useState(null);
  const [tempTaskDrop, setTempTaskDrop] = useState(null);

  const updateTempTaskId = (id) => {
    // console.log(id)
    setTempTaskId(id)
  }

  const updateTempTaskStatus = (status) => {
    // console.log(status)
    setTempTaskStatus(status)
  }

  const updateTempTaskDrop = (status) => {
    // console.log(status)
    setTempTaskDrop(status)
  }

  const updateTempTaskSort = (sort) => {
    // console.log(sort)
    setTempTaskSort(sort)
  }

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
  useEffect(() => {
    if (tempTaskDrop !== null && tempTaskSort !== null) {
      let newTasks = [...tasks]
      let draggedElement = newTasks.find((task) => task.id === tempTaskDrop)
      let changedElement = newTasks.find((task) => task.id === tempTaskSort)
      if (!draggedElement || !changedElement) return
      let draggedElementSort = draggedElement.sorting
      let changedElementSort = changedElement.sorting
      draggedElement.sorting = changedElementSort
      changedElement.sorting = draggedElementSort
      setTempTaskDrop(null)
      setTempTaskSort(null)
      setVars(newTasks)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tempTaskDrop, tempTaskSort])

  useEffect(() => {
    if (tempTaskId !== null && tempTaskStatus !== null) {
      const changeStatus = (id, newStatus) => {
        let newTasks = [...tasks]
        let task = newTasks.find((task) => task.id === id);
        if (task.status === newStatus) return
        task.status = newStatus;
        setVars(newTasks)
      }
      changeStatus(tempTaskId, tempTaskStatus)
      setTempTaskId(null)
      setTempTaskStatus(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tempTaskId, tempTaskStatus])
  return (
    <TasksContext.Provider value={{ 
      tasks,
      createNewTask,
      updateTempTaskSort,
      updateTempTaskDrop,
      updateTempTaskId,
      updateTempTaskStatus
    }}>
      {children}
    </TasksContext.Provider>
  );
}