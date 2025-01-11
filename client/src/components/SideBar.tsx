import { Target } from '../types/gameTypes';
import styles from './SideBar.module.css'

interface SideBarProps {
  targets: Target[];
  foundTargets: number[];
}

export default function SideBar({targets, foundTargets}: SideBarProps) {

  return (
    <aside className={styles.container}>
      <h2>Artists to find</h2>
      {targets.map(target => (
        <div key={target.id} className="artistName">{target.name}</div>
      ))
      }
    </aside>
  );
}