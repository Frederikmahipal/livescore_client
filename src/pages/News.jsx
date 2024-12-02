import React, { useEffect, useState } from 'react';
import { Image, Heading, Text, Button, Flex, Center, VStack, Box, useBreakpointValue, Spacer } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure } from "@chakra-ui/react";
import { ChatIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import Comments from '../components/Comments';
import axios from 'axios';


function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    axios.get('https://livescore-server.vercel.app/api/articles')
      .then(response => {
        setArticles(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ backgroundColor: '#5E707C', height: '100vh' }}>
        <Center>Loading...</Center>
      </div>
    );
  }

  if (error) {
    return <Center>Error: {error}</Center>;
  }

    return (
       <Box 
    bgColor="#5E707C" 
    minH="100vh" 
    position="absolute" // Ensure minimum height covers viewport
    pb={0}        // Remove bottom padding
    m={0}         // Remove margin
  >
      <Flex 
        flexDirection="row" 
        wrap="wrap" 
        justify="space-around" 
        p={[3, 5]} 
        mt={0} 
        mb="60px" 
        bgColor="#5E707C"
        gap={6}
      >
        {articles.map((article, index) => (
          <Card
            key={index}
            display="flex"
            flexDirection="column"
            width={["95%", "45%", "30%"]}
            minW="300px"
            maxW="400px"
            mb={5}
            boxShadow="xl"
            borderRadius="lg"
            bgColor="#3C4F5D"
            transition="all 0.2s"
            _hover={{
              transform: 'translateY(-5px)',
              boxShadow: '2xl',
            }}
          >
            <CardHeader p={4}>
              <VStack align="start" spacing={3}>
                <Heading 
                  fontSize={["md", "lg"]} 
                  lineHeight="1.4" 
                  fontWeight="bold" 
                  color="white"
                  noOfLines={2}
                >
                  {article.title}
                </Heading>
                <Text 
                  fontSize={["sm", "md"]} 
                  color="gray.300"
                  noOfLines={3}
                >
                  {article.summary}
                </Text>
              </VStack>
            </CardHeader>
  
            <CardBody p={4} pt={0}>
              <Image
                src={article.image}
                alt={article.title}
                w="100%"
                h="200px"
                objectFit="cover"
                borderRadius="md"
                transition="transform 0.2s"
                _hover={{ transform: 'scale(1.02)' }}
              />
            </CardBody>
  
            <CardFooter 
              p={4} 
              pt={2}
              borderTop="1px solid"
              borderColor="whiteAlpha.200"
            >
              <Flex justifyContent="space-between" w="100%">
                <Button
                  leftIcon={<ExternalLinkIcon />}
                  variant="outline"
                  color="white"
                  _hover={{ bg: 'whiteAlpha.200' }}
                  size="sm"
                >
                  Read More
                </Button>
                <Button
                  leftIcon={<ChatIcon />}
                  variant="solid"
                  colorScheme="blue"
                  size="sm"
                  onClick={() => { 
                    setSelectedArticle(article); 
                    onOpen(); 
                  }}
                >
                  Comments
                </Button>
              </Flex>
            </CardFooter>
          </Card>
        ))}
  
        <Modal 
          isOpen={isOpen} 
          onClose={onClose}
          motionPreset="slideInBottom"
        >
          <ModalOverlay backdropFilter="blur(4px)" />
          <ModalContent 
            maxWidth={["95vw", "80vw", "60vw"]} 
            maxHeight={["90vh", "80vh", "60vh"]} 
            bgColor="#3C4F5D"
            borderRadius="xl"
          >
            <ModalHeader 
              fontSize={["md", "lg", "xl"]} 
              color="white" 
              textAlign="center"
              borderBottom="1px solid"
              borderColor="whiteAlpha.200"
              pb={4}
            >
              {selectedArticle?.title}
            </ModalHeader>
            <ModalCloseButton color="white" />
            <ModalBody p={6}>
              {selectedArticle && (
                <Flex direction="column" h="100%" align="center">
                  <Comments articleId={selectedArticle._id} flexGrow="1" />
                </Flex>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      </Flex>
      </Box>
    );
  }
export default News;