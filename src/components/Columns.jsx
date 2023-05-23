import { useState, useContext, useEffect } from "react";
import { Title, Card } from "./";
import { TasksContext } from "../global/TasksContext";
export function Columns(props) {
  const { columnData } = props;
  const { tasks } = useContext(TasksContext);
  const processInTasks = () => {
    return tasks.filter(task => task.status === columnData.id);
  }
  const [tasksInColumn, setTasksInColumn] = useState(processInTasks());
  useEffect(() => {
    setTasksInColumn(processInTasks());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks]);
  return (
    <div className="column">
      <Title 
        type="h3" 
        text={columnData.title}
        className="column__title"
      />
      <div className="column__cards">
        {
          tasksInColumn.map((task, index) => (
            <Card
              key={`card-${index}-${task.id}`}
              taskData={task}
            />
          ))
        }
      </div>
    </div>
  );
}