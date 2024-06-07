import { Container, Text, VStack, Heading, Button } from "@chakra-ui/react";
import { FaRocket } from "react-icons/fa";
import { useSupabaseAuth } from '../integrations/supabase/auth.jsx';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { session, logout } = useSupabaseAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };
  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Heading as="h1" size="2xl">Welcome to Your New App</Heading>
        <Text fontSize="lg">This is your starting point. Begin building something amazing!</Text>
        {session ? (
          <Button onClick={handleLogout} colorScheme="teal" size="lg">
            Logout
          </Button>
        ) : (
          <Button onClick={() => navigate('/login')} leftIcon={<FaRocket />} colorScheme="teal" size="lg">
            Login
          </Button>
        )}
      </VStack>
    </Container>
  );
};

export default Index;