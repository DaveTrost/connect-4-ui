import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Board from '../board/Board';
import Connect4 from 'connect4-ai';
import useConnectFourLogic from './useConnectFourLogic';

const game = new Connect4();
const columns = 7;
const rows = 6;
const colors = ['red', 'black'];
const defaultPlayerNames = ['Player 1', 'Player 2'];

const ConnectFour = ({ playerNames }) => {
  const { 
    status,
    updateStatus, 
    board, 
    updateBoard, 
    gameOver, 
    getColumn 
  } = useConnectFourLogic(rows, columns, colors, playerNames || defaultPlayerNames);
  const [motif, setMotif] = useState('default');
  
  const handlePlay = ({ id, status }) => {
    if(status !== 'valid' || gameOver) return;
    
    game.play(getColumn(id));
    updateStatus(game.gameStatus());
    updateBoard({ playedId: id });
  };

  return (
    <>
      <p>{status}</p>
      <Board board={board} handleClick={handlePlay} motif={motif} />
      <p>Checker style: 
        <label onClick={() => setMotif('default')}>
          <input type='radio' id='default' name='motif' value='default' defaultChecked />
          Default
        </label>
        <label onClick={() => setMotif('pets')}>
          <input type='radio' id='pets' name='motif' value='pets' />
          Pets
        </label>
        <label onClick={() => setMotif('drinks')}>
          <input type='radio' id='drinks' name='motif' value='drinks' />
          Drinks
        </label>
      </p>
    </>
  );
};

ConnectFour.propTypes = {
  playerNames: PropTypes.arrayOf(
    PropTypes.string.isRequired
  ),
};

export default ConnectFour;
