import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../services/ApiClient';
import { Link } from 'react-router-dom';
import '../css/MatchDetails.css';

function MatchDetails() {
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient(`matches/${id}`)
      .then(data => {
        setMatch(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='match-details'>
      {match && (
        <div className='match-info'>
          <div className='teams'>
            <div className='team'>
              <Link className='team-link' to={`/team/${match.homeTeam.id}`}>
              <h2>{match.homeTeam.name}</h2>
              <img className='team-logo' src={match.homeTeam.crest} alt={match.homeTeam.name} />
              </Link>
              <p className='score'>{match.status === 'FINISHED' ? match.score.fullTime.home : 'Upcoming'}</p>
            </div>

            <div className='team'>
              <Link className='team-link' to={`/team/${match.awayTeam.id}`}>
              <h2>{match.awayTeam.name}</h2>
              <img className='team-logo' src={match.awayTeam.crest} alt={match.awayTeam.name} />
              </Link>
              <p className='score'>{match.status === 'FINISHED' ? match.score.fullTime.away : 'Upcoming'}</p>
            </div>
          </div>

          <div className='detail-pair'>
            <div>
              <h2>Venue</h2>
              <p>{match.venue}</p>
            </div>
            <div>
              <img className='competition-logo' src={match.competition.emblem} alt={match.competition.name} />
            </div>
          </div>

          <div className='detail-pair'>
            <div>
              <h2>Matchday</h2>
              <p>{match.matchday}</p>
            </div>
            <div>
              <h2>Date</h2>
              <p>{new Date(match.utcDate).toLocaleDateString()}</p>
            </div>
          </div>

          <div className='detail-pair'>
            <div>
              <h2>Group</h2>
              <p>{match.group}</p>
            </div>
            <div>
              <h2>Referees</h2>
              <div>
                {match.referees.map((referee, index) => (
                  <p key={index}>Name: {referee.name}, Nationality: {referee.nationality}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MatchDetails;