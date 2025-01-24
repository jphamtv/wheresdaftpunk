import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { scoreService } from '../services/scoreService';
import { Score } from '../types/gameTypes';
import ScoreBoard from '../components/ScoreBoard';
import daftPunkImage from '../assets/daft_punk_helmets.png';
import styles from './Home.module.css';

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

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <main className={styles.container}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Where's Daft Punk?</h1>
        <img
          className={styles.daftPunkImage}
          src={daftPunkImage}
          alt="Daft Punk helmets"
        />
      </div>
      <button onClick={handleStartGame}>Find the Robots</button>
      <div>
        <ScoreBoard scores={ scores } />
      </div>
    </main>
  );
}