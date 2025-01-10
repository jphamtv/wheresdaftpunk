import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { scoreService } from '../services/scoreService';
import { Score } from '../types/gameTypes';
import ScoreBoard from '../components/ScoreBoard';

export default function Home() {
  const navigate = useNavigate();
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    handleFetchScores();
  }, []);

  const handleFetchScores = async () => {
    try {
      const scores = await scoreService.getScores();
      setScores(scores);
      console.log(scores)
    } catch (err) {
      setError('Failed to load scores');
      console.error('Error loading scores: ', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartGame = async () => {
    navigate('/game', { state: { scores } });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <main>
      <h1>Where's Daft Punk?</h1>
      <img src="" alt="" />
      <button onClick={handleStartGame}>Find Daft Punk</button>
      <ScoreBoard scores={ scores } />
    </main>
  );
}