import * as React from 'react';
import './GameCell.css';

interface IProps {
  value: string;
  onClick: () => void;
}

/**
 * Компонент игровой ячейки
 */
export const GameCell: React.StatelessComponent<IProps> = (props) => {
  return (
    <div className="gameCell" onClick={props.onClick}>
      {(props.value === "X") ?
        <i className="fas fa-times tic fa-6x" />
        : (props.value === "0") ?
          <i className="far fa-circle toe fa-5x" />
          : <i />
      }
    </div>
  );
}