import { Target } from '../types/gameTypes';

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

  return (
    <div></div>
  );
}