import React from 'react';
import ConnectFour from './connect-four/ConnectFour';

export default function App() {
  const options = {
    playerNames: ['Player 1', 'Player 2'],
    humanVsHuman: true,
    computerFirst: false,
    aiDifficulty: 'easy',
    userMotif: 'default',
  };
  return (
    <>
      <ConnectFour options={options} />
    </>
  );
}
