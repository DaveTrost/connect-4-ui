import React from 'react';
import PropTypes from 'prop-types';
import { Connect4AI } from 'connect4-ai';
import Board from '../board/Board';
import useConnectFourLogic from './useConnectFourLogic';
import styles from './ConnectFour.css';

const game = new Connect4AI();
const columns = 7;
const rows = 6;
const defaultPlayerNames = ['Player 1', 'Player 2'];
const getOptions = options => {
  let { playerNames, colors, humanVsHuman, computerFirst, aiDifficulty, userMotif } = options || {};
  humanVsHuman = humanVsHuman || false;
  computerFirst = computerFirst || false;
  aiDifficulty = aiDifficulty || 'medium';
  userMotif = userMotif || 'default';
  colors = ['red', 'black'];
  if(userMotif === 'ocean') colors = ['pink', 'blue'];
  playerNames = playerNames || defaultPlayerNames;    
  if(!humanVsHuman) {
    playerNames[computerFirst ? 0 : 1] = 'Computer';
  }
  return { playerNames, colors, humanVsHuman, computerFirst, aiDifficulty, userMotif };
};

const ConnectFour = ({ options }) => {
  const { playerNames, colors, humanVsHuman, computerFirst, aiDifficulty, userMotif } = getOptions(options);
  const { 
    infoMsg,
    updateInfoMsg,
    board,
    updateBoard,
    makeAiPlay,
    makeAiInfoMsg,
    aiThinking,
    gameOver,
    getColumn
  } = useConnectFourLogic(rows, columns, colors);
  
  if(game.getMoveCount() === 0 && computerFirst && !humanVsHuman) {
    makeAiPlay(game.playAI(aiDifficulty));
    makeAiInfoMsg(game.gameStatus());
  }

  const handlePlay = ({ id, status }) => {
    if(status !== 'valid' || gameOver || aiThinking) return;
    
    game.play(getColumn(id));
    const statusUpdate = game.gameStatus();
    updateInfoMsg(statusUpdate);
    updateBoard({ playedId: id, solution: statusUpdate.solution });
    
    if(humanVsHuman) return;
    if(statusUpdate.gameOver) return;
    
    makeAiPlay(game.playAI(aiDifficulty));
    makeAiInfoMsg(game.gameStatus());
  };

  return (
    <div className={styles.ConnectFour}>
      <h1>{`${playerNames[0]} vs. ${playerNames[1]}`}</h1>
      <Board board={board} handleClick={handlePlay} motif={userMotif} />
      <h2>Status: {infoMsg}</h2>
      {aiThinking && <h3>Computer is thinking ...</h3>}
    </div>
  );
};

ConnectFour.propTypes = {
  options: PropTypes.shape({
    playerNames: PropTypes.arrayOf(
      PropTypes.string.isRequired
    ),
    humanVsHuman: PropTypes.bool,
    computerFirst: PropTypes.bool,
    aiDifficulty: PropTypes.oneOf(['hard', 'medium', 'easy']),
    userMotif: PropTypes.oneOf(['default', 'pets', 'fantasy', 'drinks', 'ocean']),
  })
};

export default ConnectFour;
