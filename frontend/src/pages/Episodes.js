import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Episodes = () => {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://api.tvmaze.com/shows/80/episodes');
        setEpisodes(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching episodes:", err);
        setError("Failed to load episode information.");
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (episodes.length === 0) return <div>No episode information available</div>;

  return (
    <div>
      {episodes.map(episode => (
        <div key={episode.id} className="post-entry-1 border-bottom">
          <div className="post-meta">
            <span className="date">Season {episode.season}</span> 
            <span className="mx-1">&bullet;</span> 
            <span>Episode {episode.number}</span>
          </div>
          <h2 className="mb-2"><Link to={`/episodes/${episode.id}`}>{episode.name}</Link></h2>
          <span className="author mb-3 d-block">Air date: {episode.airdate}</span>
          <div dangerouslySetInnerHTML={{ __html: episode.summary }} />
        </div>
      ))}
    </div>
  );
};

export default Episodes;