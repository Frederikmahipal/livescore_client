import React from 'react';

function Match({ match }) {
  return (
    <div>
      <p>{match.homeTeam.name} vs {match.awayTeam.name}</p>
      <p>Date: {new Date(match.utcDate).toLocaleDateString()}</p>
      <p>Score: {match.score.fullTime.home} - {match.score.fullTime.away}</p>
    </div>
  );
}

export default Match;