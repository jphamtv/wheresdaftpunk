import { useState, useEffect } from 'react';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import GameBoard from '../components/GameBoard';
import { GameStatus, Target } from '../types/gameTypes';
import { targetService } from '../services/targetService';

export default function Game() {
  const [gameStatus, setGameStatus] = useState<GameStatus>('not-started');  
  const [targets, setTargets] = useState<Target[]>([]);
  const [foundTargets, setfoundTargets] = useState([]);
  const [timer, setTimer] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTargets = async () => {
      try {
        const targets = await targetService.getTargets();
        setTargets(targets);
      } catch (err) {
        setError('Failed to load targets');
        console.error('Error loading targets: ', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTargets();
  }, []);

  return (
    <main className='container'>
      <Header />
      <SideBar />
      <GameBoard />
    </main>
  );
}