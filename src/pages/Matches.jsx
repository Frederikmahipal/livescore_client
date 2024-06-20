import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fetchMatches from '../services/fetchMatches';
import { Box, Center, Button, Flex, Heading, Image, Link as ChakraLink, Text, HStack, Grid } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

function Matches() {
  const [matches, setMatches] = useState(null);
  const [error, setError] = useState(null);
  const [selectedMatchday, setSelectedMatchday] = useState(1);

  useEffect(() => {
    fetchMatches((matches) => {
      const sortedMatches = matches.sort((a, b) => {
        if (a.group < b.group) {
          return -1;
        }
        if (a.group > b.group) {
          return 1;
        }
        return 0;
      });
      setMatches(sortedMatches);
    }, setError);
  }, []);

  if (!matches) {
    return (
      <div style={{ backgroundColor: '#5E707C', height: '100vh' }}>
        <Center>Loading...</Center>
      </div>
    );
  }

  // Extracting unique matchdays from the matches array
  const matchdays = [...new Set(matches.map(match => match.matchday))];

  const nextMatchday = () => setSelectedMatchday((prevDay) => prevDay + 1);
  const previousMatchday = () => setSelectedMatchday((prevDay) => prevDay - 1);


  const groupMatchesByGroup = (matches) => {
    return matches.reduce((groups, match) => {
      const key = match.group;
      if (key) {
        if (!groups[key]) {
          groups[key] = [];
        }
        groups[key].push(match);
      }
      return groups;
    }, {});
  };

  const groupedMatches = groupMatchesByGroup(matches.filter(match => match.matchday === selectedMatchday));

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
        {Object.entries(groupedMatches).map(([group, matches], index) => (
          <Box key={group} borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="lg" p={6} border="none" bgColor="#3C4F5D">
            <Heading size="lg" mb={4} color="white">{group}</Heading>
            <Box w="100%">
              {matches.slice(0, 2).map((match, matchIndex) => (
                <Link to={`/match/${match.id}`} key={matchIndex} w="100%">
                  <Text fontSize="sm" color="white" mt={1}>
                    {new Date(match.utcDate).toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}
                  </Text>                  
                  <Flex justify="space-between" p={4} rounded="md" w="100%">
                    <Flex flexDirection="column" alignItems="center">
                      <Image height={["50px", "75px"]} width={["75px", "100px"]} objectFit="cover" src={match.homeTeam.crest} alt={`${match.homeTeam.name} logo`} />
                    </Flex>
                    <Flex alignItems="center" justifyContent="center" flexDirection="row">
                      <Text fontSize="xl" fontWeight="bold" color="white">{match.score.fullTime.home}</Text>
                      <Text fontSize="xl" mx={2} color="white">-</Text>
                      <Text fontSize="xl" fontWeight="bold" color="white">{match.score.fullTime.away}</Text>
                    </Flex>
                    <Flex flexDirection="column" alignItems="center">
                      <Image height={["50px", "75px"]} width={["75px", "100px"]} objectFit="cover" src={match.awayTeam.crest} alt={`${match.awayTeam.name} logo`} />
                    </Flex>
                  </Flex>
                </Link>
              ))}
            </Box>
          </Box>

        ))}
      </Grid>
    </Box>
  );
}

export default Matches;
