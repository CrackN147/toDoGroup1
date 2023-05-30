import {useState, useEffect} from "react";
import { Header, Columns } from "./components";
import { config } from "./global/config";
import { browserStorage } from "./global/browserStorage";
export function App() {
  const [theme, setTheme] = useState(
    browserStorage.exists('theme') ? 
      browserStorage.get('theme')
    : 'light'
  );
  const changeTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    browserStorage.set('theme', theme === 'dark' ? 'light' : 'dark');
  }
  useEffect(() => {
    if (!browserStorage.exists('theme')) {
      browserStorage.set('theme', 'light');
    }
  }, []);
  return (
    <div className={`app ${theme}`}>
      <Header 
        theme={theme}
        changeTheme={changeTheme}
      />
      <div className={`columns ${theme}`}>
      {
        config.columns.map((column, index) => (
          <Columns 
            key={`column-${index}-${column.id}`} 
            columnData={column}
            theme={theme}
          />
        ))
      }
      </div>
    </div>
  );
}
