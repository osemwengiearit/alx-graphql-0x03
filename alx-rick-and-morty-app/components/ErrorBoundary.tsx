import React from 'react';
import * as Sentry from '@sentry/react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    Sentry.captureException(error, { extra: errorInfo });
    console.error('Uncaught error:', error, errorInfo);

    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center p-8 bg-red-100 border border-red-400 text-red-700 rounded-xl max-w-lg mx-auto mt-10">
          <div className="font-bold text-xl mb-4">Something went wrong.</div>
          <p className="text-sm text-center">
            We've encountered an error. The details have been logged for review.
          </p>
          <details className="mt-4 p-4 bg-red-200 border border-red-300 rounded-lg w-full overflow-auto text-xs">
            <summary className="font-semibold cursor-pointer text-red-800">
              Error Details
            </summary>
            <pre className="mt-2 whitespace-pre-wrap break-words">
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </pre>
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
