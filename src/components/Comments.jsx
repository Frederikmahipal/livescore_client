import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Input, Button, Text, VStack, Divider, Heading, HStack } from "@chakra-ui/react";
import { AuthContext } from '../services/Authcontext';
import { useContext } from 'react';
import { CheckIcon } from '@chakra-ui/icons';

const Comments = ({ articleId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { isAuthenticated, user } = useContext(AuthContext);
  
  useEffect(() => {
    axios.get(`https://ec2024server.onrender.com/api/${articleId}/comments`)
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  }, [articleId]);

  const handleCommentSubmit = () => {
    if (!isAuthenticated ||!user) {
      alert("Please log in to comment.");
      return; 
    }
  
    axios.post(`https://ec2024server.onrender.com/api/${articleId}/comments`, {
      user: user._id,
      text: newComment
    })
    .then(response => {
      setComments([...comments, response.data]);
      setNewComment('');
    })
    .catch(error => {
      console.error('Error posting comment:', error);
    });
  };
  
  return (
    <VStack
      divider={<Divider borderColor="gray.200" />}
      spacing={4}
      align="stretch"
    >
      <Box overflowY="auto" maxHeight="60vh">
        {comments.length > 0 ? (
          comments.map(comment => (
            <Box key={comment._id} p={5} mb={2} border="none" shadow="md" rounded="10%" bgColor="#3C4F5D" color="white" borderWidth="1px">
              <Heading size="md">{comment.user?.username}</Heading>
              <Text mt={2}>{comment.text}</Text>
              <Text fontSize="sm" color="gray.500">
                {new Date(comment.createdAt).toLocaleString()}
              </Text>
            </Box>
          ))
        ) : (
          <Box p={5} shadow="md" borderWidth="1px" border="none">
            <Text>Be the first to comment...</Text>
          </Box>
        )}
      </Box>
      <HStack spacing={4}>
        <Input
          type="text"
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          placeholder="Add a comment"
          bg="white"
          flex="1"
        />
        <Button onClick={handleCommentSubmit} color="#3C4F5D">
          <CheckIcon />
        </Button>
      </HStack>
    </VStack>
  );
}

export default Comments;