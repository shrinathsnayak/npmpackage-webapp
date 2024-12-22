import React, { ErrorInfo, ReactNode } from "react";
import { Center, Paper, Title } from "@mantine/core";
import { IconBug } from "@tabler/icons-react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Paper p="lg" radius="md" bg="dark.9" shadow="sm">
          <Center ta="center" my={20}>
            <div>
              <IconBug color="#fff" size={30} />
              <Title order={5} c="white" mt={5}>
                Oops! Something went wrong.
              </Title>
            </div>
          </Center>
        </Paper>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
