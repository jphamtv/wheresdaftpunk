import { Score } from "../types/gameTypes";
import styles from './ScoreBoard.module.css'

export default function ScoreBoard({ scores }: { scores: Score[] }) {
  return (
    scores.map(score => (
      <div className={styles.container} key={score.username}>
        <div>{score.username}</div>
        <div>{score.timeSeconds}</div>
      </div>
    ))
  );
}