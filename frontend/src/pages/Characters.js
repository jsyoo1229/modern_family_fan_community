import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TMDB_API_KEY = '07bda5bfc4cadba3cc328f798766739f';

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        const tvmazeCastResponse = await axios.get('https://api.tvmaze.com/shows/80/cast');
        const tmdbShowResponse = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${TMDB_API_KEY}&query=Modern Family`);
        const tmdbShowId = tmdbShowResponse.data.results[0].id;
        
        const tmdbShowDetailsResponse = await axios.get(`https://api.themoviedb.org/3/tv/${tmdbShowId}?api_key=${TMDB_API_KEY}&append_to_response=credits`);
        
        const combinedCharacters = await Promise.all(
          tvmazeCastResponse.data.map(async (castMember) => {
            const tmdbCharacter = tmdbShowDetailsResponse.data.credits.cast.find(
              c => c.character.toLowerCase() === castMember.character.name.toLowerCase()
            );
            
            let additionalInfo = {};
            if (tmdbCharacter) {
              const personResponse = await axios.get(`https://api.themoviedb.org/3/person/${tmdbCharacter.id}?api_key=${TMDB_API_KEY}`);
              additionalInfo = personResponse.data;
            }
            
            return {
              ...castMember,
              tmdbInfo: tmdbCharacter,
              additionalInfo
            };
          })
        );
        
        setCharacters(combinedCharacters);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching characters:", err);
        setError("Failed to load character information.");
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (characters.length === 0) return <div>No character information available</div>;

  return (
    <div>
      {characters.map(({ person, character, tmdbInfo, additionalInfo }) => (
        <div key={person.id} className="d-md-flex post-entry-2 half">
          <div className="me-4 thumbnail">
            <img 
              src={tmdbInfo?.profile_path 
                ? `https://image.tmdb.org/t/p/w500${tmdbInfo.profile_path}`
                : (character.image?.medium || '/api/placeholder/200/200')} 
              alt={character.name} 
              className="img-fluid"
            />
          </div>
          <div>
            <h3>{character.name}</h3>
            <div className="post-meta">
              <span>Actor: {person.name}</span>
            </div>
            {additionalInfo.biography && (
              <div>
                <h4>Biography:</h4>
                <p>{additionalInfo.biography.slice(0, 200)}...</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Characters;