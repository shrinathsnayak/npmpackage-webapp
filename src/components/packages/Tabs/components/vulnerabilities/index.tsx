'use client';

import React from 'react'
import { Box } from '@mantine/core';
import EmptyState from '@/components/shared/Empty';
import { EMPTY_TYPE } from '@/constants/empty';

interface ComponentProps {
  vulnerabilities: any;
}

const Vulnerabilities = ({ vulnerabilities }: ComponentProps) => {
  const { status, data } = vulnerabilities;

  if (Object.keys(data).length === 0 || status !== 200) {
    return <EmptyState type={EMPTY_TYPE.VULNERABILITIES} />;
  }

  console.log(data, 'data')

  return (
    <Box>Vulnerabilities</Box>
  )
}

export default Vulnerabilities