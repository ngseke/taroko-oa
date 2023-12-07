import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './style.sass'

const root = document.getElementById('root')

if (!root) throw new Error('Failed to select `#root`!')

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
