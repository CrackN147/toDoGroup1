import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
export function Card(props) {
  const { 
    taskData, 
    theme, 
    index, 
    taskId, 
    moveCard,
    updateTempTaskId,
    updateTempTaskDrop
  } = props;
  const cardRef = useRef(null)
  const [{ handlerId }, drop] = useDrop({
    accept: "box",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    drop() {
      updateTempTaskDrop()
    },
    hover(item, monitor) {
      if (!cardRef.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = cardRef.current?.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'box',
    item: () => {
      return { taskId, index }
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        updateTempTaskId()
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }))
  drag(drop(cardRef))
  
  return (
    <div 
      ref={cardRef}
      data-testid={`${taskData.title}-box`} 
      className={`card--container ${theme}`}
      data-handler-id={handlerId}
    >
      <p>{taskData.title}</p>
    </div>
  );
}