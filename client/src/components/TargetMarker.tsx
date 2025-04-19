import styles from './TargetMarker.module.css';

interface TargetMarkerProps {
  name: string;
  x: number;
  y: number;
}

export default function TargetMarker({ name, x, y }: TargetMarkerProps) {
  return (
    <span
      className={styles.label}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {name}
    </span>
  );
}
