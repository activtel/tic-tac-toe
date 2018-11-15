import * as React from 'react';
import { IGameEntity } from '../../model';
import './Users.css';

interface IProps {
  game: IGameEntity;
  xIsNext: boolean;
}

/**
 * Компонент для отображения играющих пользователей.
 */
export const Users: React.StatelessComponent<IProps> = (props) => {
  return (
    <div className="users">
        <div className="user1">
          <div className={props.xIsNext ? `active` : ``}>
            <div className="cellUser">{props.game.owner}</div>
            <div className="cellUser"><i className="fas fa-times tic fa-2x" /></div>
          </div>
        </div>
        <div className="user2">
          <div className={!props.xIsNext ? `active` : ``}>
            <div className="cellUser"><i className="far fa-circle toe fa-2x" /></div>
            <div className="cellUser">{props.game.opponent}</div>
          </div>
        </div>
      </div>
  );
}