import { Target, FoundTarget } from '../types/gameTypes';
import styles from './SideBar.module.css'

interface SideBarProps {
  className: string;
  targets: Target[];
  foundTargets: FoundTarget[];
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
      <div className={styles.credit}>
        Illustration by <a className={styles.link} href="https://www.adamcarnegie.com" target='_blank' rel='noopener noreferrer'>Adam Carnegie</a>.
      </div>
    </aside>
  );
}