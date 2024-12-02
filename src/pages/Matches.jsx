import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fetchMatches from '../services/fetchMatches';
import { Box, Center, Button, Flex, Image, Text, HStack, Grid } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

function Matches() {
  const [matches, setMatches] = useState(null);
  const [error, setError] = useState(null);
  const [selectedMatchday, setSelectedMatchday] = useState(1);
  const [showRetryMessage, setShowRetryMessage] = useState(false);

  useEffect(() => {
    // Set a timer to show the retry message after 5 seconds
    const timer = setTimeout(() => {
      if (!matches) {
        setShowRetryMessage(true);
      }
    }, 5000); // 5 seconds

    fetchMatches((matches) => {
      setMatches(matches);
      clearTimeout(timer); // Clear the timer if matches load successfully
    }, setError);

    // Cleanup the timer if component unmounts
    return () => clearTimeout(timer);
  }, []);

  if (!matches) {
    return (
      <Box bgColor="#5E707C" minH="100vh">
        <Center h="100vh">
          <Text color="white">
            {showRetryMessage 
              ? "If matches aren't loading, try again in 60 seconds" 
              : "Loading..."}
          </Text>
        </Center>
      </Box>
    );
  }

  // Extracting unique matchdays from the matches array
  const matchdays = [...new Set(matches.map(match => match.matchday))];

  const nextMatchday = () => setSelectedMatchday((prevDay) => prevDay + 1);
  const previousMatchday = () => setSelectedMatchday((prevDay) => prevDay - 1);

  const matchesForSelectedMatchday = matches.filter(match => match.matchday === selectedMatchday);

  return (
    <Box bgColor="#5E707C" minH="100vh" p={8}>
      <Center>
        <HStack spacing={4}>
          <Button onClick={previousMatchday} isDisabled={selectedMatchday === 1}>
            <ChevronLeftIcon />
          </Button>
          <Text fontSize="xl" fontWeight="bold" color="white">
            Matchday {selectedMatchday}
          </Text>
          <Button onClick={nextMatchday} isDisabled={selectedMatchday === matchdays[matchdays.length - 1]}>
            <ChevronRightIcon />
          </Button>
        </HStack>
      </Center>

      <Grid templateColumns={{ base: "repeat(auto-fit, minmax(300px, 1fr))", md: "repeat(2, 1fr)" }} gap={10} mt={10}>
        {matchesForSelectedMatchday.map((match, index) => (
          <Link to={`/match/${match.id}`} key={index} style={{ textDecoration: 'none' }}>
            <Box borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="lg" p={6} border="none" bgColor="#3C4F5D"
              _hover={{ transform: 'scale(1.02)', transition: 'all 0.2s' }}>
              <Text fontSize="sm" color="white" mt={1}>
                {new Date(match.utcDate).toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}
              </Text>
              <Flex justify="space-between" p={4} rounded="md" w="100%">
                <Flex flexDirection="column" alignItems="center">
                  <Image
                    height={["40px", "60px"]}     // Reduced height
                    width={["40px", "60px"]}      // Made width equal to height for aspect ratio
                    objectFit="contain"           // Changed from 'cover' to 'contain'
                    src={match.homeTeam.crest}
                    alt={`${match.homeTeam.name} logo`}
                  />                </Flex>
                <Flex alignItems="center" justifyContent="center" flexDirection="row">
                  <Text fontSize="xl" fontWeight="bold" color="white">{match.score.fullTime.home}</Text>
                  <Text fontSize="xl" mx={2} color="white">-</Text>
                  <Text fontSize="xl" fontWeight="bold" color="white">{match.score.fullTime.away}</Text>
                </Flex>
                <Flex flexDirection="column" alignItems="center">
                  <Image
                    height={["40px", "60px"]}
                    width={["40px", "60px"]}
                    objectFit="contain"
                    src={match.awayTeam.crest}
                    alt={`${match.awayTeam.name} logo`}
                  />                
                  </Flex>
              </Flex>
            </Box>
          </Link>
        ))}
      </Grid>
    </Box>
  );
}

export default Matches;