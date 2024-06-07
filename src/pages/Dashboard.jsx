import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { useSupabaseAuth } from '../integrations/supabase/auth.jsx';
import Tasks from '../components/Tasks.jsx';
import Files from '../components/Files.jsx';
import Messages from '../components/Messages.jsx';

const Dashboard = () => {
  const { session } = useSupabaseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      navigate('/login');
    }
  }, [session, navigate]);

  return (
    <Container maxW="container.xl" mt={4}>
      <Tabs variant="enclosed">
        <TabList>
          <Tab>Tasks</Tab>
          <Tab>Files</Tab>
          <Tab>Messages</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Tasks />
          </TabPanel>
          <TabPanel>
            <Files />
          </TabPanel>
          <TabPanel>
            <Messages />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default Dashboard;