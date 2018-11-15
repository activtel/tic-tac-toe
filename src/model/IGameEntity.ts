import { GameResult } from './GameResult';
import { GameState } from './GameState';

/**
 * Предсавляет модель игры
 */
export interface IGameEntity {
  board: string[];
  gameDuration: string; // продолжительность игры
  gameResult: GameResult; // результат игры
  gameToken: string;
  owner: string; // автор​ игры 
  opponent: string; // присоединенный​ игрок 
  state: GameState; // статус игры
}