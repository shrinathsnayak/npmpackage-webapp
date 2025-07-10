import { Alert, Button, Stack, Text } from "@mantine/core";
import { IconAlertCircle, IconRefresh } from "@tabler/icons-react";

interface TimeoutErrorProps {
  onRetry?: () => void;
  message?: string;
}

export function TimeoutError({ onRetry, message }: TimeoutErrorProps) {
  return (
    <Alert
      icon={<IconAlertCircle size="1rem" />}
      title="Request Timeout"
      color="orange"
      variant="light"
    >
      <Stack gap="xs">
        <Text size="sm">
          {message ||
            "The request is taking longer than expected. This might be due to high server load or network issues."}
        </Text>
        {onRetry && (
          <Button
            leftSection={<IconRefresh size="1rem" />}
            variant="light"
            size="sm"
            onClick={onRetry}
          >
            Try Again
          </Button>
        )}
      </Stack>
    </Alert>
  );
}
