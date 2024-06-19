import axios from 'axios';

async function fetchMatchDetails(id, setMatch, setError) {
  try {
    const response = await axios.get(`https://ec2024server.onrender.com/api/matches/${id}`);
    console.log('Received data:', response.data);
    setMatch(response.data.match);
  } catch (error) {
    console.error('Fetch error:', error);
    setError(error.toString());
  }
}

export default fetchMatchDetails;