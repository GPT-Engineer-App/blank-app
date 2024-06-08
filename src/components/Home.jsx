import { Box, SimpleGrid, Stat, StatLabel, StatNumber, useColorModeValue } from '@chakra-ui/react';
import { useTasks, useUserFiles } from '../integrations/supabase/index.js';

const Home = () => {
  const { data: tasks, isLoading: tasksLoading } = useTasks();
  const { data: files, isLoading: filesLoading } = useUserFiles();

  const tasksCount = tasks ? tasks.length : 0;
  const filesCount = files ? files.length : 0;

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
    </Box>
  );
};

export default Home;