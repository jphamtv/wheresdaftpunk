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
  const [elapsedTime, setElapsedTime] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Start game when component mounts
    handleGameStart();
  }, []);

  useEffect(() => {
    let intervalId: number;

    if (gameStatus === 'in-progress') {
      // Start client-side timer for display only
      intervalId = window.setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [gameStatus]);

  const handleGameStart = async () => {
    try {
      const targets = await targetService.getTargets();
      setTargets(targets);
      setGameStatus('in-progress');
      await scoreService.startTimer();
    } catch (err) {
      setError('Failed to start game');
      console.error('Error starting game: ', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTargetValidation = async (request: ValidationRequest) => {
    try {
      const { success, message } = await targetService.verifyLocation(
        request.targetId,
        request.xCoord,
        request.yCoord
      );

      if (success) {
        const updatedFoundTargets = [...foundTargets, request.targetId];
        setFoundTargets(updatedFoundTargets);

        // Check if game is complete
        if (updatedFoundTargets.length === targets.length) {
          await scoreService.stopTimer();
          setGameStatus('completed');
        }
      }

      return { success, message };
    } catch (err) {
      setError('Failed to verify target');
      console.error('Error verifying target: ', err);
      return { success: false, message: 'Error verifying target' };
    }
  };


  const handleGameEnd = async () => {
    try {
      const response = await scoreService.stopTimer();
      setGameStatus('completed');
      // Use server's final time_seconds for display
      setElapsedTime(response.timeSeconds);
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
      <Header timer={elapsedTime} />
      <SideBar targets={targets} foundTargets={foundTargets} />
      <GameBoard onClick={handleTargetValidation} />
    </main>
  );
}