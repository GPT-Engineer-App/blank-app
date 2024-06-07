import { useState } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';
import { useMessages, useDeleteMessages } from '../integrations/supabase/index.js';

const buttonStyles = {
  transition: "all 0.3s ease",
  _hover: {
    bg: "red.600",
    boxShadow: "md",
  },
};

const rowStyles = {
  transition: "background-color 0.3s ease",
  _hover: {
    bg: "gray.100",
  },
};

const Messages = () => {
  const { data: messages, isLoading } = useMessages();
  const deleteMessage = useDeleteMessages();
  const [localMessages, setLocalMessages] = useState([]);

  const handleDismiss = (id) => {
    deleteMessage.mutate(id, {
      onSuccess: () => {
        setLocalMessages(localMessages.filter(message => message.id !== id));
      }
    });
  };

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
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {messages.map(message => (
            <Tr key={message.id} sx={rowStyles}>
              <Td>{message.id}</Td>
              <Td>{new Date(message.created_at).toLocaleString()}</Td>
              <Td>{message.for}</Td>
              <Td>{message.message}</Td>
              <Td>
                <Button size="sm" colorScheme="red" onClick={() => handleDismiss(message.id)} sx={buttonStyles}>Dismiss</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Messages;