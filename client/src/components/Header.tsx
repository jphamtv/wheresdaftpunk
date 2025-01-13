import { Link } from 'react-router-dom';
import { Score } from '../types/gameTypes';
import styles from './Header.module.css'

interface HeaderProps {
  className: string;
  timer: number;
  scores: Score[];
}

export default function Header({ className, timer, scores}: HeaderProps) {
  const topScore = scores && scores.length > 0 ? scores[0] : null;

  return (
    <header className={`${className} ${styles.header}`}>
      <Link to={'/'}>
        <h1 className={styles.logo}>Where's Daft Punk?</h1>
      </Link>
      <div className={styles.timer}>{timer}</div>
      <div className={styles.topScore}>
        {topScore && (
          <>
            <div>Top Score:</div>
            <div>{topScore.username}</div>
            <div>{topScore.timeSeconds}</div>
          </>
        )}
      </div>
    </header>
  );
}