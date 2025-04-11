import React, { Component, ComponentType, ReactNode } from "react";

export interface ComponentErrorProps {
  error: Error;
}

type ErrorBoundaryProps = {
  children: ReactNode;
  FallbackComponent: ComponentType<ComponentErrorProps>;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {

    console.log("Error captured by ErrorBoundary:", error);
    console.log(errorInfo);
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  render() {
    const { hasError, error } = this.state;
    const { FallbackComponent, children } = this.props;

    if (hasError && error) {
      return <FallbackComponent error={error} />;
    }

    return children;
  }
}

export default ErrorBoundary;
