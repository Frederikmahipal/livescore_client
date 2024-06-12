async function apiClient(endpoint) {
  const response = await fetch(`http://localhost:8000/api/${endpoint}`);
  if (!response.ok) {
    throw new Error(`error: ${response.status}`);
  }
  return response.json();
}

export default apiClient;