import axios from 'axios';

async function fetchMatchDetails(id, setMatch, setError) {
  try {
    const response = await axios.get(`https://livescore-server.vercel.app/matches/${id}`);
    console.log('Received data:', response.data);
    setMatch(response.data.match);
  } catch (error) {
    console.error('Fetch error:', error);
    setError(error.toString());
  }
}

export default fetchMatchDetails;