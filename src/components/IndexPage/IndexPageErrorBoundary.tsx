import React from "react";

interface Props {
  children: React.ReactNode;
  fallback: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class IndexPageErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
  };
  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }
  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error with the error boundary:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
