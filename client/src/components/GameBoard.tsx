import { ValidationRequest } from "../types/gameTypes";
import styles from './GameBoard.module.css'

interface GameBoardProps {
  onTargetSelect: (request: ValidationRequest) => Promise<void>;
}

export default function GameBoard() {

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img
          className={styles.img}
          src="/festival-wheres-daftpunk.jpg"
          alt="Illustration of a festival scene"
        /> 
      </div>
    </div>
  );
}