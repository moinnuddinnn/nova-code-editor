import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div style={{
          padding: '20px',
          color: '#d4d4d4',
          backgroundColor: '#1e1e1e',
          border: '1px solid #3e3e42',
          borderRadius: '4px',
          margin: '10px'
        }}>
          <h3>Something went wrong</h3>
          <p>An error occurred while rendering this component.</p>
          <details style={{ marginTop: '10px' }}>
            <summary>Error details</summary>
            <pre style={{ 
              marginTop: '10px', 
              padding: '10px', 
              backgroundColor: '#2d2d2d',
              borderRadius: '4px',
              overflow: 'auto'
            }}>
              {this.state.error?.stack}
            </pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
