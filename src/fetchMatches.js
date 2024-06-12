import apiClient from './services/ApiClient';

async function fetchMatches(setMatches, setError) {
  try {
    const data = await apiClient('matches');
    setMatches(data.matches);
  } catch (error) {
    console.error('Fetch error:', error);
    setError(error.toString());
  }
}

export default fetchMatches;