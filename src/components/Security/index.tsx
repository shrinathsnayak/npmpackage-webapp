import { Box, Title } from '@mantine/core';
import React from 'react'

const Security = ({ packageInfo }: any) => {
  console.log(`Security`, packageInfo);
  return (
    <Box>
      <Title>OpenSSF Scorecard
</Title>
    </Box>
  )
}

export default Security;