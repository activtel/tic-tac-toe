import * as React from 'react';
import { IGameEntity } from '../../model';
import { GameBoard } from './GameBoard';

import { GameResult } from '../../model/GameResult';
import { GameState } from '../../model/GameState';
import { gamesService } from '../../service/game';

interface IState {
  game: IGameEntity;
  xIsNext: boolean;
}

/**
 * Компонент-контейнер игровой доски.
 */
export class GameBoardContainer extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      game: {
        board: ["", "", "", "", "", ""],
        gameDuration: "00:00:00",
        gameResult: GameResult.None,
        gameToken: "",
        opponent: "Тимур",
        owner: "Егор",
        state: GameState.None,
      },
      xIsNext: true
    };

    this.handleClick = this.handleClick.bind(this);
    this.surrenderClick = this.surrenderClick.bind(this);
    this.tick = this.tick.bind(this);
  }

  public componentDidMount() {
    const gameToken = this.props.match.params.id || "";

    const game = gamesService.fetchGame(gameToken)

    this.setState({
      ...this.state,
      game,
    });

  }

  public render() {
    return (
      <GameBoard
        game={this.state.game}
        handleClick={this.handleClick}
        surrenderClick={this.surrenderClick}
        xIsNext={this.state.xIsNext}
        tick = {this.tick}
      />
    );
  }

  private surrenderClick() {
    this.props.history.push('/')
  }

  private tick(time:string) {
    const game = {
      ...this.state.game,
    }

    game.gameDuration = time;

    this.setState({
      ...this.state,
      game,
    });
  }

  private handleClick(id: number) {

    // Игра закончена.
    if (this.state.game.state === GameState.Done) {
      return;
    }

    const board = [...this.state.game.board];

    if (!board[id]) {
      board[id] = this.state.xIsNext ? 'X' : '0';
    }

    const game = {
      ...this.state.game,
      board
    }

    this.setState({
      ...this.state,
      game,
      xIsNext: !this.state.xIsNext,
    });

    // определяем победителя
    const winner = this.calculateWinner(game.board);

    if (winner) {
       if (winner === "X") {
        game.gameResult = GameResult.Owner;

      } else {
        game.gameResult = GameResult.Opponent;
      }

      game.state = GameState.Done;
    }

    // Если доска заполнена, то ничья
    if (game.state !== GameState.Done && game.board.filter((g: string) => g !== "").length === game.board.length) {
      game.gameResult = GameResult.Draw;
      game.state = GameState.Done;
    }

    // Сохраняем игру
    if (game.state === GameState.Done) {
      gamesService.updateGame(game);
      this.props.history.push('/');
    }
  }

  private calculateWinner(board: string[]) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }
}
