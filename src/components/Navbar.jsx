import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Flex, Link, useBreakpointValue } from '@chakra-ui/react';
import { AuthContext } from '../services/Authcontext';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const { isAuthenticated, login, logout } = useContext(AuthContext);
  const position = useBreakpointValue({ base: "fixed", md: "static" });
  const height = useBreakpointValue({ base: "50px", md: "70px" });
  const fontSize = useBreakpointValue({ base: "16px", md: "18px" });
  const navigate = useNavigate();

  const handleAuth = () => {
    if (isAuthenticated) {
      logout();
      navigate('/matches');
    } else {
      navigate('/login');
    }
  };

  return (
    <Box bg="#1b2631" h={height} w="100%" position={position} bottom="0" zIndex="sticky">
      <Flex justify="center" align="center" h="100%">
        <Box as="ul" listStyleType="none" display="flex">
          <Box as="li" mx="10px">
            <Link as={NavLink} to="/" color="#fff"textDecoration="none" fontSize={fontSize}
              _activeLink={{ color: '#ff6347' }}>
              Matches
            </Link>
          </Box>
          <Box as="li" mx="10px">
            <Link as={NavLink} to="/news" color="#fff" textDecoration="none"
              fontSize={fontSize}
              _activeLink={{ color: '#ff6347' }}>News</Link>
          </Box>
          <Box as="li" mx="10px">
            <Link as={NavLink} to={isAuthenticated ? "/logout" : "/login"}
              color="#fff"
              textDecoration="none"
              fontSize={fontSize}
              _activeLink={{ color: '#ff6347' }}
              onClick={handleAuth} >
              {isAuthenticated ? "Logout" : "Login"}
            </Link>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}

export default Navbar;