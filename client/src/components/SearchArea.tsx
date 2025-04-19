import { useState, useRef, useEffect } from 'react';
import {
  Target,
  FoundTarget,
  ValidationRequest,
  ValidationResponse,
} from '../types/gameTypes';
import SelectionBox from './SelectionBox';
import TargetMarker from './TargetMarker';
import styles from './SearchArea.module.css';

interface SearchAreaProps {
  className: string;
  targets: Target[];
  onTargetSelect: (
    request: ValidationRequest,
    cursorPos: { x: number; y: number }
  ) => Promise<ValidationResponse>;
  foundTargets: FoundTarget[];
}

export default function SearchArea({
  className,
  onTargetSelect,
  targets,
  foundTargets,
}: SearchAreaProps) {
  const [selectedCoords, setSelectedCoords] = useState<number[]>([]);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(
    null
  );
  const containerRef = useRef<HTMLDivElement>(null);

  // New state variables for panning
  const [isDragging, setIsDragging] = useState(false);
  const [startDragPos, setStartDragPos] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [hasMoved, setHasMoved] = useState(false);

  // Constants for drag threshold
  const DRAG_THRESHOLD = 5; // pixels to move before considering it a drag

  // Focus the container when component mounts
  useEffect(() => {
    if (containerRef.current) {
      // Make the container focusable and focus it
      containerRef.current.tabIndex = 0;
      containerRef.current.focus();

      // This prevents the focus outline from showing
      containerRef.current.style.outline = 'none';
    }
  }, []);

  // Scroll lock effect
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

  // Handle mouse down - potential start of drag
  const handleMouseDown = (e: React.MouseEvent<HTMLImageElement>) => {
    if (e.button !== 0) return; // Only handle left mouse button

    // Record the starting position
    setStartDragPos({ x: e.clientX, y: e.clientY });
    setIsDragging(true);
    setHasMoved(false);

    // Change cursor to grabbing
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grabbing';
    }
  };

  // Handle mouse move - continue drag if started
  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!isDragging || !startDragPos || !containerRef.current) return;

    const deltaX = e.clientX - startDragPos.x;
    const deltaY = e.clientY - startDragPos.y;

    // Check if we've moved enough to consider this a drag operation
    if (
      !hasMoved &&
      (Math.abs(deltaX) > DRAG_THRESHOLD || Math.abs(deltaY) > DRAG_THRESHOLD)
    ) {
      setHasMoved(true);
    }

    if (hasMoved) {
      // Move the scroll position
      containerRef.current.scrollLeft -= deltaX;
      containerRef.current.scrollTop -= deltaY;

      // Update the start position for the next move event
      setStartDragPos({ x: e.clientX, y: e.clientY });
    }
  };

  // Handle mouse up - end of drag or click
  const handleMouseUp = (e: React.MouseEvent<HTMLImageElement>) => {
    // Reset cursor
    if (containerRef.current) {
      containerRef.current.style.cursor = 'auto';
    }

    // If we didn't drag (or barely moved), treat as a click
    if (!hasMoved && isDragging) {
      handleClick(e);
    }

    // Reset drag state
    setIsDragging(false);
    setStartDragPos(null);
  };

  // Handle mouse leave - similar to mouse up but without click
  const handleMouseLeave = () => {
    if (isDragging && containerRef.current) {
      containerRef.current.style.cursor = 'auto';
      setIsDragging(false);
      setStartDragPos(null);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    // Skip if this is part of a drag operation
    if (hasMoved) return;

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
    if (cursorPos) {
      onTargetSelect(
        {
          id: targetId,
          xCoord: selectedCoords[0],
          yCoord: selectedCoords[1],
        },
        cursorPos
      );
    }
    setSelectedCoords([]);
    setCursorPos(null);
  };

  return (
    <div
      ref={containerRef}
      className={`${className} ${styles.searchArea} ${isDragging ? styles.grabbing : ''}`}
      tabIndex={0}
    >
      <div className={styles.imageContainer}>
        <img
          className={styles.img}
          src="/festival-wheres-daftpunk.jpg"
          alt="Illustration of a festival scene"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          draggable="false" // Prevent default browser drag behavior
        />
        {foundTargets.map(target => (
          <TargetMarker
            key={target.id}
            name={target.name}
            x={target.x}
            y={target.y}
          />
        ))}
      </div>

      {selectedCoords.length > 0 && cursorPos && (
        <>
          <div
            className={styles.clickMarker}
            style={{
              position: 'fixed',
              left: cursorPos.x,
              top: cursorPos.y,
              transform: 'translate(-50%, -50%)',
            }}
          />
          <SelectionBox
            coords={selectedCoords}
            cursorPos={cursorPos}
            targets={targets}
            foundTargets={foundTargets}
            onSelect={handleTargetSelect}
            containerRef={containerRef}
            onClose={() => {
              setSelectedCoords([]);
              setCursorPos(null);
            }}
          />
        </>
      )}
    </div>
  );
}
