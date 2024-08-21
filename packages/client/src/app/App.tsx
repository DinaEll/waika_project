import { useEffect } from 'react'
import { BrowserRouterProvider } from './providers/router'
import { Layout } from '@/widgets/Layout'
// import './App.css'

function App() {
  // useEffect(() => {
  //     const fetchServerData = async () => {
  //         const url = `http://localhost:${__SERVER_PORT__}`
  //         const response = await fetch(url)
  //         const data = await response.json()
  //         console.log(data)
  //     }

  //     fetchServerData()
  // }, [])
  return (
    <BrowserRouterProvider>
      <Layout />
    </BrowserRouterProvider>
  )
}

export default App
