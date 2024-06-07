import { useState } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Checkbox } from '@chakra-ui/react';
import { useMessages, useUpdateMessageStatus } from '../integrations/supabase/index.js';

const Messages = () => {
  const { data: messages, isLoading } = useMessages();
  const [checkedMessages, setCheckedMessages] = useState({});
  const updateMessageStatus = useUpdateMessageStatus();

  const handleCheckboxChange = (message) => {
    const updatedStatus = !checkedMessages[message.id];
    setCheckedMessages({ ...checkedMessages, [message.id]: updatedStatus });
    updateMessageStatus.mutate({ id: message.id, is_checked: updatedStatus });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th></Th>
            <Th>ID</Th>
            <Th>Created At</Th>
            <Th>For</Th>
            <Th>Message</Th>
          </Tr>
        </Thead>
        <Tbody>
          {messages.map(message => (
            <Tr key={message.id}>
              <Td>
                <Checkbox 
                  isChecked={checkedMessages[message.id] || message.is_checked} 
                  onChange={() => handleCheckboxChange(message)} 
                />
              </Td>
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