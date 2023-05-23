import { useContext, useState } from 'react';
import { TasksContext } from '../global/TasksContext';
import NightlightIcon from '@mui/icons-material/Nightlight';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from './Button';
export function Header(props) {
  const { changeTheme } = props;
  const { createNewTask } = useContext(TasksContext);
  const [isOpen, setIsOpen] = useState(false);
  const [taskName, setTaskName] = useState('');
  const handleOpen = () => {
    setIsOpen(true);
  }
  const handleClose = () => {
    setIsOpen(false);
  }
  const handleAdd = () => {
    createNewTask(taskName);
    setIsOpen(false);
    setTaskName('');
  }
  const changeTaskName = (event) => {
    let value = event.target.value;
    setTaskName(value);
  }
  return (
    <header className="app-header">
      <Button
        className="button--icon--add--task"
        title="Add Task"
        onClick={handleOpen}
      />
      <Button
        className="button--icon--theme"
        onClick={changeTheme}
      >
        <NightlightIcon />
      </Button>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">
          {"Ready to create your first Task?"}
        </DialogTitle>
        <DialogContent>
          <input 
            type="text" 
            placeholder="Task Name"
            value={taskName}
            onChange={changeTaskName}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleAdd} autoFocus>Add</Button>
        </DialogActions>
      </Dialog>
    </header>
  );
}