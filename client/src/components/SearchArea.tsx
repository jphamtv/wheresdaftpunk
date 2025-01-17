import { useState, useRef, useEffect } from "react";
import { Target, ValidationRequest, ValidationResponse } from "../types/gameTypes";
import SelectionBox from './SelectionBox'
import styles from './SearchArea.module.css'

interface SearchAreaProps {
  className: string;
  targets: Target[];
  foundTargets: number[];
  onTargetSelect: (request: ValidationRequest) => Promise<ValidationResponse>;
}

export default function SearchArea({
  className,
  onTargetSelect,
  targets,
  foundTargets
}: SearchAreaProps) {
  const [selectedCoords, setSelectedCoords] = useState<number[]>([]);
  const [cursorPos, setCursorPos] = useState<{x: number, y: number} | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const searchArea = containerRef.current;
    if (!searchArea) return;
    
    // Check if SelectionBox is open
    if (selectedCoords.length > 0 && cursorPos) {
      // Disable scrolling on both body and SearchArea
      document.body.style.overflow = 'hidden';
      searchArea.style.overflow = 'hidden';
    } else {
      // Re-enable scrolling
      document.body.style.overflow = 'auto';
      searchArea.style.overflow = 'auto';
    }

    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
      if (searchArea) {
      searchArea.style.overflow = 'auto';
    }
    };
  }, [selectedCoords, cursorPos]);

  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const image = e.currentTarget;
    const container = containerRef.current;
    if (!container) return;

    // Store cursor position for SelectionBox
    setCursorPos({ x: e.clientX, y: e.clientY });

    // Keep existing coordinate calculation for validation
    const containerRect = container.getBoundingClientRect();
    const clickX = e.clientX - containerRect.left;
    const clickY = e.clientY - containerRect.top;
    const xWithScroll = clickX + container.scrollLeft;
    const yWithScroll = clickY + container.scrollTop;
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
    setCursorPos(null);
  };

  return (
    <div ref={containerRef} className={`${className} ${styles.searchArea}`}>
      {selectedCoords.length > 0 && cursorPos && (
        <>
          <div 
          className={styles.clickMarker}
          style={{
            position: 'fixed',
            left: cursorPos.x,
            top: cursorPos.y,
            transform: 'translate(-50%, -50%)' 
          }}
          />
          <SelectionBox
            coords={selectedCoords}
            cursorPos={cursorPos}
            targets={targets}
            foundTargets={foundTargets}
            onSelect={handleTargetSelect}
            containerRef={containerRef}
          />
        </>
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