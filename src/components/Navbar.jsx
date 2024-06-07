import { Box, Flex, Button, useColorMode, useColorModeValue, Spacer } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";
import { useSupabaseAuth } from '../integrations/supabase/auth.jsx';

const navButtonStyles = {
  transition: "all 0.3s ease",
  _hover: {
    transform: "scale(1.05)",
    bg: useColorModeValue("gray.200", "gray.700"),
  },
};

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
          <Button variant="ghost" sx={navButtonStyles}>Home</Button>
        </RouterLink>
        <Spacer />
        <Flex alignItems={"center"}>
          <Button onClick={toggleColorMode} sx={navButtonStyles} mr={4}>
            {icon}
          </Button>
          {session ? (
            <Button onClick={handleLogout} colorScheme="teal" size="sm" sx={navButtonStyles}>
              Logout
            </Button>
          ) : (
            <RouterLink to="/login">
              <Button colorScheme="teal" size="sm" sx={navButtonStyles}>
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