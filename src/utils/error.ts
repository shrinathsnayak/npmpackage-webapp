"use client";

import * as Sentry from "@sentry/nextjs";

export const captureException = (message: any, tags?: any) => {
  return Sentry.captureException(message, {
    tags: { ...tags },
  });
};
