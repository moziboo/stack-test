import styles from './App.module.css';
import { AppProvider } from './context/AppContext';
import Home from './pages/Home';
import { useAppContext } from './hooks/useAppContext';
import UBCheckbox from './components/UBCheckbox';
import UBRadioGroup from './components/UBRadioGroup';
import UBInput from './components/UBInput';

import FormDemo from './sampleForm';
import { useState } from 'react';

function AppContent() {
  const { theme, toggleTheme } = useAppContext();
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('first');
  const [inputValue, setInputValue] = useState('');

  return (
    <div className={`app ${theme}`}>
      <header className={styles.header}>
        <button onClick={toggleTheme}>Switch to {theme === 'light' ? 'dark' : 'light'} mode</button>
      </header>

      <main>
        <UBCheckbox
          checked={checked}
          onCheckedChange={setChecked}
          label="Accept terms and conditions"
        />
        <UBRadioGroup
          value={radioValue}
          onValueChange={setRadioValue}
          options={[
            { value: 'first', label: 'First' },
            { value: 'second', label: 'Second' },
          ]}
        />
        <UBInput
          label="Username"
          placeholder="Enter your username"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        <Home />
        <FormDemo />
      </main>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
