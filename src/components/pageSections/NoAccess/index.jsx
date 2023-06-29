import { Box, Button, Heading, Link, Spacer, Text } from '@chakra-ui/react';
import { WarningTwoIcon } from '@chakra-ui/icons';
import { Link as LinkTo } from 'react-router-dom'
export default function NoAccess() {
  return (
    <Box textAlign="center" py={10} px={6}>
      <WarningTwoIcon boxSize={'50px'} color={'orange.300'} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        No Access
      </Heading>
      <Text color={'gray.500'}>
        You do not have access to this page, please  <Link color='blue'>
          <LinkTo to='/auth/login'>
            login
          </LinkTo>
        </Link> to your account.
        <Spacer />

      </Text>
    </Box>
  );
}