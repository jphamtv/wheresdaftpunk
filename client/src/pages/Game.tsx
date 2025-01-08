import { useState, useEffect } from 'react';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import GameBoard from '../components/GameBoard';
import { GameStatus, Target, ValidationRequest } from '../types/gameTypes';
import { targetService } from '../services/targetService';
import { scoreService } from '../services/scoreService';

export default function Game() {
  const [gameStatus, setGameStatus] = useState<GameStatus>('not-started');  
  const [targets, setTargets] = useState<Target[]>([]);
  const [foundTargets, setFoundTargets] = useState<number[]>([]);
  const [timer, setTimer] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Start game when component mounts
    handleGameStart();
  }, []);

  const handleGameStart = async () => {
    try {
      const targets = await targetService.getTargets();
      setTargets(targets);
      setGameStatus('in-progress');
      await scoreService.startGame();
    } catch (err) {
      setError('Failed to start game');
      console.error('Error starting game: ', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTargetValidation = async (request: ValidationRequest) => {
    try {
      const { success, message } = await targetService.validateLocation(
        request.selectedTarget,
        request.coordinates.xCoord,
        request.coordinates.yCoord
      );

      if (success) {
        const updatedFoundTargets = [...foundTargets, request.selectedTarget];
        setFoundTargets(updatedFoundTargets);

        // Check if game is complete
        if (updatedFoundTargets.length === foundTargets.length) {
          await scoreService.stopTimer();
          setGameStatus('completed');
        }
      }

      return { success, message };
    } catch (err) {
      setError('Failed to validate target');
      console.error('Error validating target: ', err);
      return { success: false, message: 'Error validating target' };
    }
  };


  const handleGameEnd = async () => {
    try {
      setGameStatus('completed');
    } catch (err) {
      setError('Failed to end game');
      console.error('Error ending game: ', err);
    }
  };
  
  const handleScoreSubmit = async (username: string) => {
    try {
      await scoreService.endGame(username);            
    } catch (err) {
      setError('Failed to submit score');
      console.error('Error submitting score: ', err);
    }    
  };
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <main className='container'>
      <Header timer={timer} />
      <SideBar targets={targets} foundTargets={foundTargets} />
      <GameBoard onClick={handleTargetValidation} />
    </main>
  );
}