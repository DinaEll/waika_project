import { Component, ErrorInfo, ReactNode } from 'react'
import { NotFoundPage } from '@/pages/NotFoundPage'

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  }

  constructor(props: Props) {
    super(props)
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <NotFoundPage />
    }
    return this.props.children
  }
}
