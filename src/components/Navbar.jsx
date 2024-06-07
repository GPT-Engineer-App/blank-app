import { Box, Flex, Button, useColorMode, useColorModeValue, Spacer } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";
import { useSupabaseAuth } from '../integrations/supabase/auth.jsx';

const Navbar = () => {
  const { session, logout } = useSupabaseAuth();
  const { colorMode, toggleColorMode } = useColorMode();
  const icon = useColorModeValue(<FaMoon />, <FaSun />);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <RouterLink to="/">
          <Button variant="ghost">Home</Button>
        </RouterLink>
        <Spacer />
        <Flex alignItems={"center"}>
          <Button onClick={toggleColorMode} mr={4}>
            {icon}
          </Button>
          {session ? (
            <Button onClick={handleLogout} colorScheme="teal" size="sm">
              Logout
            </Button>
          ) : (
            <RouterLink to="/login">
              <Button colorScheme="teal" size="sm">
                Login
              </Button>
            </RouterLink>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;