import styles from './TargetMarker.module.css';

interface TargetMarkerProps {
  name: string;
  xCoord: number;  // Already in percentage format (0-10000)
  yCoord: number;
}

export default function TargetMarker({ name, xCoord, yCoord }: TargetMarkerProps) {
  // Convert from 0-10000 range to 0-100 percentage
  const xPercent = (xCoord / 10000) * 100;
  const yPercent = (yCoord / 10000) * 100;

  return (
    <div 
      className={styles.markerContainer}
      style={{ 
        left: `${xPercent}%`, 
        top: `${yPercent}%`,
        position: 'absolute',
        transform: 'translate(-50%, -50%)'
      }}
    >
      <div className={styles.marker} />
      <span className={styles.label}>{name}</span>
    </div>
  );
}