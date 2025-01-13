import { ValidationRequest } from "../types/gameTypes";
import styles from './SearchArea.module.css'

interface SearchAreaProps {
  className: string;
  onTargetSelect: (request: ValidationRequest) => Promise<void>;
}

export default function SearchArea({ className, onTargetTelect }: SearchAreaProps) {

  return (
    <div className={`${className} ${styles.searchArea}`}>
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