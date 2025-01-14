import { useState, useRef } from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const image = e.currentTarget;
    const container = containerRef.current;
    if (!container) return;

    const rect = image.getBoundingClientRect();

    // Get click coordinates relative to the visible viewport
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Add scroll offset to get the true position within the image
    const xWithScroll = x + container.scrollLeft;
    const yWithScroll = y + container.scrollTop;

    // Convert to percentages and multiple by 100 for integers
    const xCoord = Math.round((xWithScroll / image.width) * 10000); 
    const yCoord = Math.round((yWithScroll / image.height) * 10000);
    
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
    <div ref={containerRef} className={`${className} ${styles.searchArea}`}>
      {selectedCoords.length > 0 && (
        <SelectionBox
          coords={selectedCoords}
          targets={targets}
          foundTargets={foundTargets}
          onSelect={handleTargetSelect}
          containerRef={containerRef}
        />
      )}
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