import Timer from './Timer';

export default function Header() {
  return (
    <>
      <h1>Where's Daft Punk?</h1>
      <Timer />
      <div>
          <div>{username}</div>
          <div>{score}</div>
      </div>
    </>
  );
}