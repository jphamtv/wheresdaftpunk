import { Score } from "../types/gameTypes";
import styles from './ScoreBoard.module.css'

export default function ScoreBoard({ scores }: { scores: Score[] }) {
  return (
    <div className={styles.container}>
      <h2>Top Scores</h2>
      {scores.map(score => (
        <div className={styles.scoreContainer} key={score.username}>
          <div>{score.username}</div>
          <div>{score.timeSeconds}</div>
        </div>
      ))}
    </div>
  );
}