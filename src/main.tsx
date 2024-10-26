import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// css
import './styles/index.css'

// main component
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
