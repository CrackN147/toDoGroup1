import React from 'react';
import ReactDOM from 'react-dom/client';
import './theme/scss/index.scss';
import {App} from './App';
import {TasksProvider} from './global/TasksContext';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TasksProvider>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </TasksProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
