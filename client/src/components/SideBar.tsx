import { Target } from '../types/gameTypes';
import styles from './SideBar.module.css'

interface SideBarProps {
  className: string;
  targets: Target[];
  foundTargets: Array<{
    id: number;
    name: string;
    xCoord: number;
    yCoord: number;
  }>;
}

export default function SideBar({ className, targets, foundTargets}: SideBarProps) {

  return (
    <aside className={className}>
      <h2 className={styles.title}>Artists to find</h2>
      {targets.map(target => (
        <div key={target.id} className={`${styles.artistName} ${foundTargets.some(found => found.id === target.id) ? styles.found : ''}`}>
          {target.name}
        </div>
      ))}
    </aside>
  );
}