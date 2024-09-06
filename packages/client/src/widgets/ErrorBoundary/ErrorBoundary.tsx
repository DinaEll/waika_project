import { Component, ErrorInfo, ReactNode } from 'react'
import { ServerErrorPage } from '@/pages/ServerErrorPage'

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

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.props.children !== prevProps.children && prevState.hasError) {
      this.setState({ hasError: false })
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ hasError: true })
    console.error('Uncaught error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <ServerErrorPage />
    }
    return this.props.children
  }
}
