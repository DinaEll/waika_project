import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'
import '@/shared/themes/colors.scss'
import '@/shared/themes/styles.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
