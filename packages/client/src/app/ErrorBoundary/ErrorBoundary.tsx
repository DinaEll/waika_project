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
    this.setState({ hasError: false })
  }

  componentDidUpdate(prevProps: Props, _previousState: State) {
    if (this.props.children !== prevProps.children && _previousState.hasError) {
      this.setState({ hasError: false })
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ hasError: true })
    console.error('Uncaught error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <NotFoundPage />
    }
    return this.props.children
  }
}
