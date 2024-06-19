import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, useToast, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../services/Authcontext';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://ec2024server.onrender.com/api/login', {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status < 200 || response.status >= 300) {
        throw new Error(`Login failed with status: ${response.status}`);
      }

      const data = response.data;

      if (data.message === 'Logged in successfully') {
        login(data.user);

        toast({
          title: "Logged in.",
          description: "You've successfully logged in.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });

        navigate('/news')
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Box p={5} bg="#5E707C" minHeight="100vh" width="100%">
      <form onSubmit={handleSubmit}>
        <FormControl id="email" isRequired>
          <FormLabel color="white">Email address</FormLabel>
          <Input type="email" value={email} bg="white" onChange={(e) => setEmail(e.target.value)} />
        </FormControl>

        <FormControl id="password" isRequired mt={4}>
          <FormLabel color="white">Password</FormLabel>
          <Input type="password" bg="white" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>

        <Button type="submit" mt={4}>
          Log In
        </Button>
        <Text mt={4} color="white">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </Text>
      </form>
    </Box>
  );
}

export default Login;