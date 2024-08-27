import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'
import '@/app/assets/themes/colors.scss'
import '@/app/assets/themes/styles.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
