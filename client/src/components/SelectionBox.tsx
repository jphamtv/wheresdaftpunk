import { useEffect, useRef } from 'react';
import { Target } from '../types/gameTypes';
import styles from './SelectionBox.module.css'

interface SelectionBoxProps {
  coords: number[];
  cursorPos: { x: number; y: number };
  targets: Target[];
  onSelect: (targetId: number) => void;
  containerRef: React.RefObject<HTMLDivElement>;
  onClose: () => void;
  foundTargets: Array<{
    id: number;
    name: string;
    x: number;
    y: number;
    xCoord: number;
    yCoord: number;
  }>;
}

export default function SelectionBox({
  coords,
  cursorPos,
  targets,
  foundTargets,
  onSelect,
  containerRef,
  onClose
}: SelectionBoxProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const remainingTargets = targets.filter(target =>
    !foundTargets.some(found => found.id === target.id)
  );

  useEffect(() => {
    const box = boxRef.current;
    const container = containerRef.current;
    if (!box || !container) return;

    const boxRect = box.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    // Position box to the right or left of cursor
    const showOnLeft = cursorPos.x > containerRect.width / 2;
    const xOffset = showOnLeft ? -boxRect.width - 50 : 50;
    
    box.style.position = 'fixed'; 
    box.style.left = `${cursorPos.x + xOffset}px`;
    
    // Vertical positioning with bounds checking
    let topPos = cursorPos.y - (boxRect.height / 2);
    const minTop = 10;
    const maxTop = window.innerHeight - boxRect.height - 10;
    topPos = Math.max(minTop, Math.min(maxTop, topPos));
    
    box.style.top = `${topPos}px`;
  }, [cursorPos, containerRef]);

  if (coords.length === 0 || remainingTargets.length === 0) {
    return null;
  }

  return (
    <div
      ref={boxRef}
      className={styles.selectionBox}
    >
      <div className={styles.closeButton} onClick={onClose}>
        close
      </div>
      <ul className={styles.targetList}>
        {remainingTargets.map(target => (
          <li
            key={target.id}
            className={styles.targetItem}
            onClick={() => onSelect(target.id)}
          >
            {target.name}
          </li>
        ))}
      </ul>
    </div>
  );
}