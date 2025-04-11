import React, { ComponentType } from "react";
import ErrorBoundary, { ComponentErrorProps } from "../../components/ErrorBoundary/ErrorBoundary";

let defaultFallback: React.FC<ComponentErrorProps> = ({ error }) => {
  return <div>{error.message}</div>;
};

export type FallbackComponent = ComponentType<ComponentErrorProps>;

interface IErrorBoundaryProps {
  FallbackComponent?: FallbackComponent;
}

type BoundedComponent<P> = ComponentType<P & IErrorBoundaryProps>;

interface IWithErrorBoundary {
  <P extends object>(
    Component: ComponentType<P>,
    InitalFallback?: FallbackComponent
  ): BoundedComponent<P>;
}

const withErrorBoundary: IWithErrorBoundary = <P extends object>(
  Component: ComponentType<P>,
  InitalFallback?: FallbackComponent
) => {
  return (props: P & IErrorBoundaryProps) => {
    const { FallbackComponent, ...rest } = props;

    const fallback = FallbackComponent || InitalFallback || defaultFallback;

    return (
      <ErrorBoundary FallbackComponent={fallback}>
        <Component {...(rest as P)} />
      </ErrorBoundary>
    );
  };
};

export default withErrorBoundary;
