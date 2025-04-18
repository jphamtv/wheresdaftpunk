import { Link } from 'react-router-dom';
import { Score } from '../types/gameTypes';
import { formatTime } from '../utils/timeFormat';
import daftPunkImage from '../assets/daftpunk.png';
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
        {/* <h1 className={styles.logo}>Where's Daft Punk?</h1> */}
        <h1><img
          className={styles.logo}
          src={daftPunkImage}
          alt="Daft Punk helmets"
        /></h1>
      </Link>
      <div className={styles.timer}>{formatTime(timer)}</div>
      {topScore && (
          <div className={styles.topScore}>{`Top Score: ${topScore.username} ${formatTime(topScore.timeSeconds)}`}</div>
      )}
    </header>
  );
}