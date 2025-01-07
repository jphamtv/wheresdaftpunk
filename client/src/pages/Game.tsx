import { useState, useEffect } from 'react';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import GameBoard from '../components/GameBoard';
import { GameStatus, Target } from '../types/gameTypes';
import { targetService } from '../services/targetService';
import { scoreService } from '../services/scoreService';

export default function Game() {
  const [gameStatus, setGameStatus] = useState<GameStatus>('not-started');  
  const [targets, setTargets] = useState<Target[]>([]);
  const [foundTargets, setfoundTargets] = useState([]);
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

  return (
    <main className='container'>
      <Header />
      <SideBar />
      <GameBoard />
    </main>
  );
}