import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { DarkModeProvider } from './context/DarkModeContext';
import { Provider } from 'react-redux'
import { store } from './redux/store';

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
  <BrowserRouter>
    <StrictMode>
      <ThemeProvider>
        <App />
      </ThemeProvider>
      ,
    </StrictMode>
  </BrowserRouter>
  </Provider>
);
