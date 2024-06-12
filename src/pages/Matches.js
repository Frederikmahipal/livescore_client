import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Match from '../components/Match';
import fetchMatches from '../fetchMatches';
import '../css/Matches.css';

function Matches() {
  const [matches, setMatches] = useState(null);
  const [error, setError] = useState(null);
  const [selectedMatchday, setSelectedMatchday] = useState(1);

  useEffect(() => {
    fetchMatches((matches) => {
      // Sort matches by group
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

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!matches) {
    return <div>Loading...</div>;
  }

  // Get unique matchdays
  const matchdays = [...new Set(matches.map(match => match.matchday))];

  const nextMatchday = () => {
    const currentIndex = matchdays.indexOf(selectedMatchday);
    if (currentIndex < matchdays.length - 1) {
      setSelectedMatchday(matchdays[currentIndex + 1]);
    }
  };

  const previousMatchday = () => {
    const currentIndex = matchdays.indexOf(selectedMatchday);
    if (currentIndex > 0) {
      setSelectedMatchday(matchdays[currentIndex - 1]);
    }
  };

  // Group matches by group
  const groupMatchesByGroup = (matches) => {
    return matches.reduce((groups, match) => {
      const key = match.group;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(match);
      return groups;
    }, {});
  };

  const groupedMatches = groupMatchesByGroup(matches.filter(match => match.matchday === selectedMatchday));

  return (
    <div className="matches-container">
      <div className="matchday-buttons">
        <button onClick={previousMatchday}>Previous</button>
        <div className="matchday-button">
          Matchday {selectedMatchday}
        </div>
        <button onClick={nextMatchday}>Next</button>
      </div>

      {Object.entries(groupedMatches).map(([group, matches]) => (
        <div className="group-card" key={group}>
          <h2>{group}</h2>
          {matches.map(match => (
            <Link to={`/match/${match.id}`} key={match.id} className="match-link">
              <img className='team-logo' src={match.homeTeam.crest} alt={`${match.homeTeam.name} logo`} />
              <Match className="team-name" match={match} />
              <img className='team-logo' src={match.awayTeam.crest} alt={`${match.awayTeam.name} logo`} />
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Matches;