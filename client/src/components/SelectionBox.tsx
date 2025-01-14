import { useEffect, useRef, useState } from 'react';
import { Target } from '../types/gameTypes';
import styles from './SelectionBox.module.css'

interface SelectionBoxProps {
  coords: number[];
  targets: Target[];
  foundTargets: number[];
  onSelect: (targetId: number) => void;
  containerRef: React.RefObject<HTMLDivElement>;
}

export default function SelectionBox({
  coords,
  targets,
  foundTargets,
  onSelect,
  containerRef
}: SelectionBoxProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  // const [position, setPosition] = useState({ x: 0, y: 0, isRight: true });
  const remainingTargets = targets.filter(target =>
    !foundTargets.includes(target.id)
  );

  useEffect(() => {
    const box = boxRef.current;
    const container = containerRef.current;
    if (!box || !container || coords.length === 0) return;

    const containerRect = container.getBoundingClientRect();
    const boxRect = box.getBoundingClientRect();

    // Convert percentage coordinates to pixels
    const x = (coords[0] / 10000) * containerRect.width;
    const y = (coords[1] / 10000) * containerRect.height;

    // Determine if click is in the left or right half of container
    const showOnLeft = x > containerRect.width / 2;

    // Position the box horizontally
    box.style.position = 'absolute';
    box.style.left = `${showOnLeft ? x - boxRect.width - 40 : x + 40}px`;

    // Account for scroll position when calculating vertical position
    let topPosition = y - (boxRect.height / 2);

    // Get the visible area boundaries relative to container
    const visibleTop = container.scrollTop;
    const visibleBottom = visibleTop + containerRect.height; 
    
    // Adjust topPosition to stay within visible area
    if (topPosition < visibleTop) {
        topPosition = visibleTop + 10; // 10px padding from top
    } else if (topPosition + boxRect.height > visibleBottom) {
        topPosition = visibleBottom - boxRect.height - 10; // 10px padding from bottom
    }
    
    box.style.top = `${topPosition}px`;
  }, [coords, containerRef]);

  if (coords.length === 0 || remainingTargets.length === 0) {
    return null;
  }

  return (
    <div
      ref={boxRef}
      className={styles.selectionBox}
    >
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