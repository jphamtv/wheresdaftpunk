import { useState } from 'react';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import GameBoard from '../components/GameBoard';

type GameStatus = 'not started' | 'in-progress' | 'completed';

interface Artist {
  id: number;
  name: string;
  isFound: boolean;
}

export default function Game() {
  const [gameStatus, setGameStatus] = useState('not-started');  
  const [artists, setArtists] = useState<Artist[]>([]);
  const [timer, setTimer] = useState('');
  const [foundArtists, setfoundArtists] = useState([]);

  return (
    <main className='container'>
      <Header />
      <SideBar />
      <GameBoard />
    </main>
  );
}