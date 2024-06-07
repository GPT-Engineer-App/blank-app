import { useState } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { useMessages } from '../integrations/supabase/index.js';

const Messages = () => {
  const { data: messages, isLoading } = useMessages();

  if (isLoading) return <div>Loading...</div>;

  return (
    <Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Created At</Th>
            <Th>For</Th>
            <Th>Message</Th>
          </Tr>
        </Thead>
        <Tbody>
          {messages.map(message => (
            <Tr key={message.id}>
              <Td>{message.id}</Td>
              <Td>{new Date(message.created_at).toLocaleString()}</Td>
              <Td>{message.for}</Td>
              <Td>{message.message}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Messages;