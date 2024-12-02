import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, useToast, Text, Link } from '@chakra-ui/react';
import axios from 'axios';

function Signup() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const toast = useToast();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('https://livescore-server.vercel.app/api/register', {
                email,
                username,
                password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status < 200 || response.status >= 300) {
                throw new Error(`Signup failed with status: ${response.status}`);
            }

            const user = response.data;

            toast({
                title: "Account created.",
                description: "We've created your account.",
                status: "success",
                duration: 9000,
                isClosable: true,
            });

            // Redirect user to login page
            Navigate('/login')
        } catch (error) {
            console.error('Signup failed:', error);
        }
    };

    return (
        <Box p={5} bg="#5E707C" minHeight="100vh" width="100%">
            <form onSubmit={handleSubmit}>
                <FormControl id="email" isRequired>
                    <FormLabel color="white">Email address</FormLabel>
                    <Input type="email" bg="white" value={email} onChange={(e) => setEmail(e.target.value)} />
                </FormControl>

                <FormControl id="username" isRequired mt={4}>
                    <FormLabel color="white">Username</FormLabel>
                    <Input type="text" value={username} bg="white" onChange={(e) => setUsername(e.target.value)} />
                </FormControl>

                <FormControl id="password" isRequired mt={4}>
                    <FormLabel color="white">Password</FormLabel>
                    <Input type="password" value={password} bg="white" onChange={(e) => setPassword(e.target.value)} />
                </FormControl>

                <Button type="submit" mt={4}>
                    Sign Up
                </Button>
                <Text mt={4} color="white">
                    Already have an account? <Link to="/login">Login</Link>
                </Text>
            </form>
        </Box>
    );
}

export default Signup;