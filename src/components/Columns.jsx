import { useState, useContext, useEffect, useCallback } from "react";
import update from 'immutability-helper'
import { Title, Card } from "./";
import { TasksContext } from "../global/TasksContext";
import { useDrop } from 'react-dnd'
export function Columns(props) {
  const { columnData, theme } = props;
  const {
    tasks,
    updateTempTaskId,
    updateTempTaskStatus,
    updateTempTaskSort,
    updateTempTaskDrop
  } = useContext(TasksContext);
  const filterTasks = () => {
    let newTasks = tasks.filter((task) => task.status === columnData.id);
    return newTasks.sort((a, b) => {
      return a.sort > b.sort ? 1 : -1
    })
  }
  const [tasksInColumn, setTasksInColumn] = useState(filterTasks());
  const [{ }, drop] = useDrop(() => ({
    accept: 'box',
    drop: () => (
      updateTempTaskStatus(columnData.id)
    ),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))
  const moveCard = useCallback((taskId, hoverIndex) => {
    updateTempTaskSort(taskId)
    setTasksInColumn((prevCards) =>
      update(prevCards, {
        $splice: [
          [taskId, 1],
          [hoverIndex, 0, prevCards[taskId]],
        ],
      }),
    )
  }, [])
  useEffect(() => {
    setTasksInColumn(filterTasks());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks]);

  const renderCard = useCallback((task, index) => {
    return (
      <Card
        key={`card-${index}-${task.id}`}
        taskData={task}
        taskId={task.id}
        theme={theme}
        index={index}
        moveCard={moveCard}
        updateTempTaskId={
          () => updateTempTaskId(task?.id)
        }
        updateTempTaskDrop={
          () => updateTempTaskDrop(task?.id)
        }
      />
    );
  }, []);
  return (
    <div className={`column ${theme}`} ref={drop} data-testid="dustbin">
      <Title
        type="h3"
        text={columnData.title}
        className="column__title"
      />
      <div className="column__cards">
        {tasksInColumn.map((task, index) => renderCard(task, index))}
      </div>
    </div>
  );
}