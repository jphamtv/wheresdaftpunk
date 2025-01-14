import { useEffect, useRef, useState } from 'react';
import { Target } from '../types/gameTypes';
import styles from './SelectionBox.module.css'

interface SelectionBoxProps {
  coords: number[];
  targets: Target[];
  foundTargets: number[];
  onSelect: (targetId: number) => void;
}

export default function SelectionBox({
  coords,
  targets,
  foundTargets,
  onSelect
}: SelectionBoxProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const remainingTargets = targets.filter(target =>
    !foundTargets.includes(target.id)
  );

  useEffect(() => {
    if (coords.length === 0 || !boxRef.current) return;

    const box = boxRef.current;
    const rect = box.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Calculate if box would overflow right or bottom
    const wouldOverflowRight = (coords[0] / 100 * windowWidth) + rect.width > windowWidth;
    const wouldOverflowBottom = (coords[1] / 100 * windowHeight) + rect.height > windowHeight;

    setPosition({
      left: wouldOverflowRight ? coords[0] - 100 : coords[0],
      top: wouldOverflowBottom ? coords[1] - 100 : coords[1]
    });
  }, [coords]);

  if (coords.length === 0 || remainingTargets.length === 0) {
    return null;
  }

  return (
    <div
      ref={boxRef}
      className={styles.selectionBox}
      style={{
        left: `${coords[0]}%`,
        top: `${coords[1]}%`
      }}
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