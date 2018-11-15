import * as React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { GameBoardContainer } from './components/game';
import { GameForm } from './components/game/GameForm';
import { Games } from './components/games';


import './App.css';

class App extends React.Component {
  public render() {
   return (
      <div className="container">
        <header>Tic Tac Toe</header>
        <BrowserRouter>
          <Switch>
            <Switch>
              <Route exact={true} path="/game" component={GameBoardContainer } />
              <Route exact={true} path="/game/add" component={GameForm} />
              <Route path="/game/:id" component={GameBoardContainer} />
              <Route path="/" component={Games} />
            </Switch>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
