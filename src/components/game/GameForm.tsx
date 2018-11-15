import * as React from 'react';
import { GameResult } from '../../model/GameResult';
import { GameState } from '../../model/GameState';
import { gamesService } from '../../service/game';

import './GameForm.css';

interface IState {
  owner: string;
  opponent: string;
  gameToken: string;
}

export class GameForm extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
        gameToken: "",
        opponent: "",
        owner: ""
    };

    this.addGame = this.addGame.bind(this);
  }
  public render() {
    return (
      <div>

         <input className="form-control" type="text" 
            onChange={(event) => this.setState({ owner: event.target.value })}
            placeholder="Введите имя создателя игры..."/>

        <input className="form-control" type="text" 
            onChange={(event) => this.setState({ opponent: event.target.value })}
            placeholder="Введите имя оппонента..."/>

        <input className="form-control" type="text" 
            onChange={(event) => this.setState({ gameToken: event.target.value })}
            placeholder="Введите идентификатор игры..."/>

            <button className="btn" onClick={this.addGame}>Сохранить</button>
      </div>
    );
  }

  private addGame() {

    gamesService.addGame({
      board: ["", "", "", "", "", "", "", "", ""],
      gameDuration:"00:00:00",
      gameResult: GameResult.None,
      gameToken: this.state.gameToken,
      opponent: this.state.opponent,
      owner: this.state.owner,
      state: GameState.None
    });

    this.props.history.push(`/game/${this.state.gameToken}`)
  }
}