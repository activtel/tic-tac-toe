import { IGameEntity } from '../../model';

/* игры храним в localStorage
 * 
 * в реальном проекте игры необходимо сохранять на сервере
 */

// наименование ключа в локальном хранилище localStorage
const LOCAL_STORAGE_NAME = 'tic-tac-toe-games';

/**
 * Возвращает список игр
 */
const fetchGames = (): IGameEntity[] => {
  if (!localStorage[LOCAL_STORAGE_NAME])  {
    return [];
  }

  return JSON.parse(localStorage[LOCAL_STORAGE_NAME]);
};

/**
 * Возвращает игру
 */
const fetchGame = (gameToken: string): IGameEntity => {
  if (!localStorage[LOCAL_STORAGE_NAME])  {
    throw new Error('Игра не найдена');
  }

  const games = JSON.parse(localStorage[LOCAL_STORAGE_NAME]);
  
  return games.filter((g: any) => g.gameToken === gameToken)[0];
};

/**
 * Добавляет игру
 */
const addGame = (game: IGameEntity): void => {
  let games =[];
  if (localStorage[LOCAL_STORAGE_NAME])  {
    games = JSON.parse(localStorage[LOCAL_STORAGE_NAME]);
  }
  games = [...games, game];
  localStorage[LOCAL_STORAGE_NAME] = JSON.stringify(games);
};

/**
 * Обновляет игру
 */
const updateGame = (game: IGameEntity): void => {
  if (!localStorage[LOCAL_STORAGE_NAME])  {
    throw new Error('Игра не найдена');
  }

  const games = JSON.parse(localStorage[LOCAL_STORAGE_NAME]);

  const filterGames = games.filter((g: any) => g.gameToken !== game.gameToken);
  
  const newGames = [ ...filterGames, game];

  localStorage[LOCAL_STORAGE_NAME] = JSON.stringify(newGames);
};

export const gamesService = {
  addGame,
  fetchGame,
  fetchGames,
  updateGame
};