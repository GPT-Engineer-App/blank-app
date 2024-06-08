import { Box, SimpleGrid, Stat, StatLabel, StatNumber, useColorModeValue, VStack, Heading, Text, IconButton, Center } from '@chakra-ui/react';
import { useState } from 'react';
import { CloseIcon } from '@chakra-ui/icons';
import { useTasks, useUserFiles, useMessages } from '../integrations/supabase/index.js';

const Home = () => {
  const { data: tasks, isLoading: tasksLoading } = useTasks();
  const [dismissedAnnouncements, setDismissedAnnouncements] = useState([]);
  const { data: files, isLoading: filesLoading } = useUserFiles();
  const { data: messages, isLoading: messagesLoading } = useMessages();

  const tasksCount = tasks ? tasks.length : 0;
  const filesCount = files ? files.length : 0;

  const handleDismiss = (id) => {
    setDismissedAnnouncements([...dismissedAnnouncements, id]);
  };

  return (
    <Box p={4}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stat
          px={{ base: 2, md: 4 }}
          py={'5'}
          shadow={'xl'}
          border={'1px solid'}
          borderColor={useColorModeValue('gray.200', 'gray.500')}
          rounded={'lg'}>
          <StatLabel fontWeight={'medium'} isTruncated>
            Tasks to be Completed
          </StatLabel>
          <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
            {tasksLoading ? 'Loading...' : tasksCount}
          </StatNumber>
        </Stat>
        <Stat
          px={{ base: 2, md: 4 }}
          py={'5'}
          shadow={'xl'}
          border={'1px solid'}
          borderColor={useColorModeValue('gray.200', 'gray.500')}
          rounded={'lg'}>
          <StatLabel fontWeight={'medium'} isTruncated>
            Files to be Signed
          </StatLabel>
          <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
            {filesLoading ? 'Loading...' : filesCount}
          </StatNumber>
        </Stat>
      </SimpleGrid>
      <Box mt={10}>
        <Heading as="h2" size="lg" mb={4}>Announcements</Heading>
        {messagesLoading ? (
          <Text>Loading...</Text>
        ) : (
          <VStack spacing={4} align="stretch">
            {messages.length === dismissedAnnouncements.length ? (
          <Center>
            <Text fontSize="xl" fontWeight="bold">You're all caught up!</Text>
          </Center>
        ) : (
          messages.map(message => (
            !dismissedAnnouncements.includes(message.id) && (
              <Box
                key={message.id}
                p={4}
                shadow="md"
                borderWidth="1px"
                borderRadius="md"
                bg={useColorModeValue('gray.100', 'gray.700')}
                position="relative"
              >
                <IconButton
                  icon={<CloseIcon />}
                  size="sm"
                  colorScheme="blackAlpha"
                  position="absolute"
                  top="4px"
                  right="4px"
                  onClick={() => handleDismiss(message.id)}
                />
                <Text fontWeight="bold">{new Date(message.created_at).toLocaleDateString()}</Text>
                <Text mt={2}>{message.message}</Text>
              </Box>
            )
          ))
        )}
          </VStack>
        )}
      </Box>
    </Box>
  );
};

export default Home;