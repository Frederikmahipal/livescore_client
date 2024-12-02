import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, VStack, Text, Stack, Flex, useBreakpointValue } from '@chakra-ui/react';
import axios from 'axios';

function TeamDetails({ id }) {
  const [team, setTeam] = useState(null);
  const [error, setError] = useState(null);
  const isBaseBreakpoint = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    axios.get(`https://livescore-server.vercel.app/api/teams/${id}`)
   .then(response => setTeam(response.data))
   .catch(error => console.error(error));
  }, [id]);

  if (error) {
    return <Box bgColor="red">Error: {error.message}</Box>;
  }

  if (!team) {
    return <Box>Loading...</Box>;
  }

  const groupPlayersByPosition = (players) => {
    const groups = {
      Goalkeepers: [],
      Defenders: [],
      Midfielders: [],
      Forwards: []
    };

    players.forEach(player => {
      //add '-' 
      let normalizedPosition = player.position.toLowerCase().replace(/\s+/g, '-');
      switch (normalizedPosition) {
        case 'goalkeeper':
          groups.Goalkeepers.push(player);
          break;
        case 'left-back':
        case 'centre-back':
        case 'right-back':
          groups.Defenders.push(player);
          break;
        case 'defensive-midfield':
        case 'central-midfield':
        case 'attacking-midfield':
          groups.Midfielders.push(player);
          break;
        case 'centre-forward':
        case 'left-winger':
        case 'right-winger':
          groups.Forwards.push(player);
          break;
        default:
          console.log(`Unknown position: ${player.position}`);
      }
    });

    return groups;
  };

  const abbreviatePosition = (position) => {
    switch (position.toLowerCase()) {
      case 'goalkeeper':
        return 'GK';
      case 'left-back':
      case 'centre-back':
      case 'right-back':
      case 'Defence':
        return 'DEF';
      case 'defensive midfield':
      case 'central midfield':
      case 'attacking midfield':
      case 'Midfield':
        return 'MID';
      case 'centre-forward':
      case 'left winger':
      case 'right winger':
        return 'FWD';
      default:
        return position;
    }
  };

  const groupedPlayers = groupPlayersByPosition(team.squad);

  return (
    <Box border={'none'} p={4}>
      <Heading size="md" color="white" mb={3} textAlign="center">{team.name}</Heading>
      <Flex direction="column" align="center" justify="center" mt={8}>
        {Object.entries(groupedPlayers).map(([position, players], index) => (
          <Box key={index} maxWidth="600px" width="100%" p={2} mb={-1} bgColor="#3C4F5D" borderRadius="md" boxShadow="sm">
            <VStack spacing={4} align="center">
              {players.map((player, playerIndex) => (
                <Flex justifyContent="space-between" alignItems="center" width="100%" key={playerIndex}>
                  <Text fontSize={["sm"]} mr={2} color="white">{player.name}</Text>
                  <Text fontSize={["xs", "md"]} color="gray.400">{isBaseBreakpoint ? abbreviatePosition(player.position) : player.position}</Text>
                </Flex>
              ))}
            </VStack>
          </Box>
        ))}
      </Flex>
    </Box>
  );
}

export default TeamDetails;