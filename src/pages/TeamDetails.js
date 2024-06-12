import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../services/ApiClient';
import '../css/TeamDetails.css';

function TeamDetails() {
  const { id } = useParams();
  const [team, setTeam] = useState(null);

  useEffect(() => {
    apiClient(`team/${id}`)
      .then(data => setTeam(data))
      .catch(error => console.error(error));
  }, [id]);

  if (!team) {
    return <div>Loading...</div>;
  }

  return (
    <div className="team-details">
      <h1>{team.name}</h1>
      <img src={team.crest} alt={team.name} />
      <p>Founded: {team.founded}</p>
      <p>Venue: {team.venue}</p>
      <p>Website: <a href={team.website}>{team.website}</a></p>
      <h2>Squad</h2>
      <div className="squad-list">
        {team.squad.map(player => (
          <div key={player.id} className="player-item">
            <span className="player-name">{player.name}</span>
            <span className="player-position">{player.position}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamDetails;