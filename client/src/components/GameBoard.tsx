import { ValidationRequest } from "../types/gameTypes";

interface GameBoardProps {
  onTargetSelect: (request: ValidationRequest) => Promise<void>;
}

export default function GameBoard() {

  return (
    <>
      <div className="img-container">
        <img src="/festival-wheres-daftpunk.jpg" alt="Illustration of a festival scene" />        
      </div>
    </>
  );
}