import React from 'react';

function Match({ className, teamNameClass, dateClass, match }) {
  return (
    <div className={className}>
      <p className={teamNameClass}>{match.homeTeam.name} vs {match.awayTeam.name}</p>
      <p className={dateClass}>Date: {new Date(match.utcDate).toLocaleDateString()}</p>
      <p>{match.score.fullTime.home} - {match.score.fullTime.away}</p>
    </div>
  );
}

export default Match;