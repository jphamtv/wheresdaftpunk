import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { scoreService } from '../services/scoreService';
import { Score } from '../types/gameTypes';
import ScoreBoard from '../components/ScoreBoard';
import daftPunkImage from '../assets/daftpunk.png';
import { logger } from '../utils/logger';
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
      logger.error('Error loading scores: ', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStartGame = async () => {
    navigate('/game', { state: { scores } });
  };

  if (loading) {
    return (
      <div className={styles.stateContainer}>
        <div className={styles.loading}>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.stateContainer}>
        <div className={styles.error}>{error}</div>
      </div>
    );
  }

  return (
    <main className={styles.container}>
      {/* Small screen message */}
      <div className={styles.smallScreenMessage}>
        <h1 className={styles.title}>Where's Daft Punk?</h1>
        <img
          className={styles.daftPunkImage}
          src={daftPunkImage}
          alt="Daft Punk helmets"
        />
        <p>
          Sorry! This game is optimized for larger screens.
        </p>
        <p>
          Please use a desktop computer or tablet in landscape mode (iPad Pro or larger) 
          for the best experience.
        </p>
      </div>

      {/* Main content for larger screens */}
      <div className={styles.mainContent}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Where's Daft Punk?</h1>
          <img
            className={styles.daftPunkImage}
            src={daftPunkImage}
            alt="Daft Punk helmets"
          />
        </div>
        <div className={styles.gameIntro}>
          <p>
            The robots are hiding...and they're not alone. From punk to funk, from
            rock to electronica - legends of music are tearing it up with the
            punters.
          </p>
          <p>
            Your mission: search through the epic music festival scene to spot
            Daft Punk and other legendary artists.
          </p>
          <p>Time is ticking!</p>
        </div>
        <button
          onClick={handleStartGame}
          className={styles.startButton}
        >
          Start Game
        </button>
        {scores.length > 0 && 
          <div>
            <ScoreBoard scores={scores} />
          </div>
        }
      </div>
    </main>
  );
}
