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
    axios.get('https://ec2024server.onrender.com/api/articles')
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
    return <Center>Loading...</Center>;
  }

  if (error) {
    return <Center>Error: {error}</Center>;
  }


  return (
    <Flex flexDirection="row" wrap="wrap" justify="space-around" p={5} mt={0} mb="60px" bgColor="#5E707C">
      {articles.map((article, index) => (
        <Card
          key={index}
          display="flex"
          flexDirection="column"
          alignItems="center"
          width={["100%", "80%", "60%"]}
          maxW="800px"
          mb={5}
          p={5}
          boxShadow="md"
          borderRadius="md"
          flexBasis={["100%", "45%"]}
          bgColor="#3C4F5D"
        >
          <CardHeader>
            <VStack align="start" spacing={4}>
              <Box h="50px">
                <Heading mb={2} fontSize={["md", "lg", "xl"]} lineHeight="1.2" fontWeight="bold" color="white">
                  {article.title}
                </Heading>
              </Box>
              <Box h="100px">
                <Text mb={2} fontSize={["sm", "md", "lg"]} color="white">{article.summary}</Text>
              </Box>
            </VStack>
          </CardHeader>
          <CardBody>
            <Image src={article.image} alt={article.title} w="100%" h="auto" rounded="5%" />
          </CardBody>
          <CardFooter>
            <Flex justifyContent="space-between" w="100%">
              <Button
                mt={5}
                mr={7}
                p={2}
                borderRadius="md"
                onClick={() => window.open(article.link, '_blank')}
              >
                <ExternalLinkIcon />
              </Button>
              <Button
                mt={5}
                ml={2}
                colorScheme="gray"
                onClick={() => { setSelectedArticle(article); onOpen(); }}
              >
                <ChatIcon />
              </Button>
            </Flex>
          </CardFooter>
        </Card>
      ))}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxWidth={["95vw", "80vw", "60vw"]} maxHeight={["90vh", "80vh", "60vh"]} p={5} bgColor="#5E707C">
          <ModalHeader mb={2} fontSize={["md", "lg", "xl"]} lineHeight="1.2" fontWeight="bold" color="white" textAlign="center">
            {selectedArticle?.title}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody overflowY="auto" maxHeight="90vh">
            {selectedArticle && (
              <Flex direction="column" h="100%" align="center">
                <Image src={selectedArticle.image} alt={selectedArticle.title} w="40%" rounded="3%" h="auto" mb={5} />
                <Comments articleId={selectedArticle._id} flexGrow="1" />
              </Flex>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default News;