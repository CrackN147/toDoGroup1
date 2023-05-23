import {useState} from "react";
import { Header, Columns } from "./components";
import { config } from "./global/config";
export function App() {
  const [theme, setTheme] = useState('');
  const changeTheme = () => {
    setTheme(theme === 'dark' ? '' : 'dark');
  }
  return (
    <div className={`app ${theme}`}>
      <Header 
        changeTheme={changeTheme}
      />
      <div className="columns">
      {
        config.columns.map((column, index) => (
          <Columns 
            key={`column-${index}-${column.id}`} 
            columnData={column} 
          />
        ))
      }
      </div>
    </div>
  );
}
