import { Score } from '../types/gameTypes';
import styles from './Header.module.css'

interface HeaderProps {
  timer: number;
  scores: Score[];
}

export default function Header({timer, scores}: HeaderProps) {
  const topScore = scores && scores.length > 0 ? scores[0] : null;

  return (
    <header className={styles.container}>
      <h1>Where's Daft Punk?</h1>
      <div className={styles.timer}>{timer}</div>
      <div className={styles.topScore}>
        {topScore && (
          <>
            <div>{topScore.username}</div>
            <div>{topScore.timeSeconds}</div>
          </>
        )}
      </div>
    </header>
  );
}