import * as React from 'react';
import { IGameEntity } from '../../model';
import './GameBoard.css';
import { GameCell } from './GameCell';
import { Timer } from './Timer';
import { Users } from './Users';


interface IProps {
  game: IGameEntity;
  xIsNext: boolean;
  handleClick: (id: number) => void;
  surrenderClick: () => void;
  tick: (time: string) => void;
}

/**
 * Компонент для отображеня игровой доски.
 */
export const GameBoard: React.StatelessComponent<IProps> = (props) => {
  return (
    <div className="game">
      <Users game={props.game} xIsNext={props.xIsNext} />
      <div className="gameBoard">
        {
          props.game.board.map((gameCell, index) => <GameCell key={index} value={gameCell} onClick={() => props.handleClick(index)} />)
        }
      </div>
      <Timer tick={props.tick}/>

      <button className="surrender" onClick={props.surrenderClick}>К списку игр</button>
    </div>

  );
}