import * as React from 'react';
import { Link } from 'react-router-dom';
import { IGameEntity } from '../../model';
import { GameResult } from '../../model/GameResult';

import { gamesService } from '../../service/game';

import './Games.css';


interface IState {
  games: IGameEntity[];
  currentUser: string;
}

/**
 * Компонент для отображения списка игр.
 */
export class Games extends React.Component<{}, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
      currentUser: "",
      games: []
    };
  }

  public componentDidMount() {
    const games = gamesService.fetchGames()
    this.setState({ games });
  }

  public render() {
    return [
      <div key="games" className="row">
        {
          this.state.games.map((game: IGameEntity) =>
            <div className="gameLink" key={game.gameToken}>
              <Link to={`/game/${game.gameToken}`}>
                {this.owner(game)}
                {this.opponent(game)}
                <div className="time">{game.gameDuration}</div>
              </Link>
            </div>)
        }
      </div>,
      <Link key="add" to={`/game/add`} className="circle-btn">
        +
      </Link>
    ];
  }

  private owner(game: IGameEntity) {

    let className = "owner";
    let icon: any = (<i />);

    if (game.gameResult === GameResult.Owner) {
      className = `${className} winner`
      icon = <i className="fas fa-trophy" />;
    }

    return (
      <div className={className}>
        {game.owner}
        {icon}
      </div>
    )
  }

  private opponent(game: IGameEntity) {

    let className = "opponent";
    let icon: any = (<i />);

    if (game.gameResult === GameResult.Opponent) {
      className = `${className} winner`
      icon = <i className="fas fa-trophy" />;
    }

    return <div className={className}>{game.opponent}
      {icon}</div>
  }
}