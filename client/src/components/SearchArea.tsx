import { useState } from "react";
import { Target, ValidationRequest } from "../types/gameTypes";
import SelectionBox from './SelectionBox'
import styles from './SearchArea.module.css'

interface SearchAreaProps {
  className: string;
  targets: Target[];
  foundTargets: number[];
  onTargetSelect: (request: ValidationRequest) => Promise<void>;
}

export default function SearchArea({
  className,
  onTargetSelect,
  targets,
  foundTargets
}: SearchAreaProps) {
  const [selectedCoords, setSelectedCoords] = useState<number[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const image = e.currentTarget;
    const rect = image.getBoundingClientRect();
    const scrollLeft = e.currentTarget.parentElement?.scrollLeft || 0;
    const scrollTop = e.currentTarget.parentElement?.scrollTop || 0;

    const x = e.clientX - rect.left + scrollLeft;
    const y = e.clientY - rect.top + scrollTop;

    const xCoord = (x / image.width) * 100; // Convert percentage to integer
    const yCoord = (y / image.height) * 100;
    
    setSelectedCoords([xCoord, yCoord]);
  };

  const handleTargetSelect = (targetId: number) => {
    onTargetSelect({
      id: targetId,
      xCoord: selectedCoords[0],
      yCoord: selectedCoords[1]
    });
    setSelectedCoords([]);
  };

  return (
    <div className={`${className} ${styles.searchArea}`}>
      <SelectionBox
        coords={selectedCoords}
        targets={targets}
        foundTargets={foundTargets}
        onSelect={handleTargetSelect}
      />
      <div className={styles.imageContainer}>
        <img
          className={styles.img}
          onClick={handleClick}
          src="/festival-wheres-daftpunk.jpg"
          alt="Illustration of a festival scene"
        /> 
      </div>
    </div>
  );
}