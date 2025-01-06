import Header from '../components/Header';
import SideBar from '../components/SideBar';
import GameBoard from '../components/GameBoard';

export default function Home() {
  return (
    <main>
      <Header />
      <SideBar />
      <GameBoard />
    </main>
  );
}