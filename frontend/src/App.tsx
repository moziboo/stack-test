import './App.css'
import styles from './App.module.css'
import { AppProvider } from './context/AppContext'
import Home from './pages/Home'
import { useAppContext } from './hooks/useAppContext'

function AppContent() {
  const { theme, toggleTheme } = useAppContext();
  
  return (
    <div className={`app ${theme}`}>
      <header className={styles.header}>
        <button onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'dark' : 'light'} mode
        </button>
      </header>
      
      <main>
        <Home />
      </main>
    </div>
  )
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}

export default App
