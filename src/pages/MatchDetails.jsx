import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link, Box, Grid, Heading, Text, Image, VStack, Center, Flex, GridItem, useToast } from '@chakra-ui/react';
import TeamDetails from '../components/TeamDetails';
import axios from 'axios';

function MatchDetails() {
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`https://ec2024server.onrender.com/api/matches/${id}`)
      .then(response => {
        setMatch(response.data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setError('Try again in a minute');
      });
  }, [id]);

  if (error) {
    return (
      <Box p={4} bgColor="orange.500" color="white" borderRadius="md">
        <Text align="center">{error}</Text>
      </Box>
    )
  }


  return (
    <Box p={5} mx="auto" bgColor="#5E707C" minH="100vh">
      {match && (
        <Grid templateColumns={{ base: "1fr", md: "1fr" }} gap={4} w="full">

          <GridItem colSpan={1} p={4}>
            <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={3} maxW="full" w="full" border="none" bgColor="#3C4F5D">
              <Flex direction="row" justify="space-around" wrap="wrap" align="center">

                <Flex direction="column" align="center">
                  <Image height={["50px", "75px"]} width={["75px", "100px"]} objectFit="cover" src={match.homeTeam.crest} alt={match.homeTeam.name} />
                </Flex>

                <Text fontSize={["xl"]} color="white">{match.status === 'FINISHED' ? `${match.score.fullTime.home} - ${match.score.fullTime.away}` : 'Upcoming'}</Text>

                <Flex direction="column" align="center">
                  <Image height={["50px", "75px"]} width={["75px", "100px"]} objectFit="cover" src={match.awayTeam.crest} alt={match.awayTeam.name} />
                </Flex>
              </Flex>
            </Box>
          </GridItem>

          <GridItem colSpan={1} p={4}>
            <Box borderWidth="1px" borderRadius="lg" overflow="hidden" border="none" maxW="full" w="full">
              <Flex direction="row" justifyContent="space-between" alignItems="start">
                <GridItem flex={1} py={4}> 
                  <TeamDetails id={match.homeTeam.id} />
                </GridItem>
                <GridItem flex={1} py={4}> 
                  <TeamDetails id={match.awayTeam.id} />
                </GridItem>
              </Flex>
            </Box>
          </GridItem>
          <GridItem colSpan={1} p={4}>
            <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={6} maxW="full" w="full" border="none">
              <Flex direction={["column", "row"]} justify="space-around" wrap="wrap" align="center">

                <Flex direction="column" align="center" flex={1} p={2}>
                  <Heading size={["sm", "md"]} color="white">Stadium</Heading>
                  <Text color="white" mt={1} style={{ paddingTop: '10px' }}>{match.venue}</Text>
                </Flex>

                <Flex direction="column" align="center" flex={1} p={2}>
                  <Image src={match.competition.emblem} alt={match.competition.name} boxSize={["40px", "75px"]} objectFit="contain" />
                </Flex>
                <Flex direction="column" align="center" flex={1} p={2}>
                  <Heading size={["sm", "md"]} color="white">Officials</Heading>
                  <Text color="white" mt={1} style={{ paddingTop: '10px' }}>{match.referees.map(referee => referee.name).join(', ')}</Text>
                </Flex>
              </Flex>
            </Box>
          </GridItem>
        </Grid>
      )}
    </Box>
  );
}

export default MatchDetails;
