import { BrowserRouterProvider } from './providers/router'
import { Layout } from '@/widgets/Layout'
import { ErrorBoundary } from '@/app/ErrorBoundary/ErrorBoundary'

function App() {
  return (
    <BrowserRouterProvider>
      <ErrorBoundary>
        <Layout />
      </ErrorBoundary>
    </BrowserRouterProvider>
  )
}

export default App
