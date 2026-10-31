import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './GameEntry.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
