import { Score } from "../types/gameTypes";
import { formatTime } from '../utils/timeFormat';
import styles from './ScoreBoard.module.css'

export default function ScoreBoard({ scores }: { scores: Score[] }) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Top Scores</h2>
      {scores.map(score => (
        <div className={styles.scoreContainer} key={score.username}>
          <div className={styles.username}>{score.username}</div>
          <div></div>
          <div className={styles.score}>{formatTime(score.timeSeconds)}</div>
        </div>
      ))}
    </div>
  );
}