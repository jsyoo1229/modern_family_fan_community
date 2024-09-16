import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShowInfo = () => {
  const [showInfo, setShowInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShowInfo = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://api.tvmaze.com/shows/80');
        setShowInfo(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching show info:", err);
        setError("Failed to load show information.");
        setLoading(false);
      }
    };

    fetchShowInfo();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!showInfo) return <div>No show information available</div>;

  return (
    <div className="d-md-flex post-entry-2 half">
      <div className="me-4 thumbnail">
        <img src={showInfo.image?.original || '/api/placeholder/400/400'} alt={showInfo.name} className="img-fluid" />
      </div>
      <div>
        <h3>{showInfo.name}</h3>
        <div dangerouslySetInnerHTML={{ __html: showInfo.summary }} />
        <p>Genres: {showInfo.genres.join(', ')}</p>
        <p>Network: {showInfo.network?.name}</p>
        <p>Status: {showInfo.status}</p>
        <p>Rating: {showInfo.rating?.average}/10</p>
      </div>
    </div>
  );
};

export default ShowInfo;