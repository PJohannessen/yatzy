import max from 'lodash/max';
import Board from './Board';
import { Player } from '../types/Player';
import { GameState } from '../types/GameState';
import { ScoringCategory } from '../types/Scoring';
import { ScoreCalculator } from '../utils/ScoreCalculator';
import { GameContext } from '../types/GameContext';
let BgReact = require('boardgame.io/react');

const createInitialScores = () => {
  return {
    ones: null,
    twos: null,
    threes: null,
    fours: null,
    fives: null,
    sixes: null,
    onePair: null,
    twoPairs: null,
    threeOfAKind: null,
    fourOfAKind: null,
    smallStraight: null,
    largeStraight: null,
    fullHouse: null,
    chance: null,
    yatzy: null,
  };
};

const createGame = (numberOfPlayers: number) => {
  const totalDice = 5;

  return {
    name: 'Yatzy',
    setup: () => {
      const players: Player[] = [];
      for (let p = 0; p < numberOfPlayers; p++) {
        players.push({
          id: p.toString(),
          name: "Player " + (p+1),
          scoring: createInitialScores()
        });
      }

      const dice = Array(totalDice).fill(1);
      const diceHeld = Array(totalDice).fill(false);
      const totalRolls = 0;

      return ({
        dice,
        diceHeld,
        players,
        totalRolls
      });
    },
    moves: {
      rollDice: (G: GameState, ctx: GameContext) => {
        // Don't allow the dice to be rolled more than 3 times.
        if (G.totalRolls >= 3) return;

        // Roll a D6 for each dice that isn't being held.
        for (let d = 0; d < G.dice.length; d++) {
          if (!G.diceHeld[d]) G.dice[d] = ctx.random.D6();
        }
        G.totalRolls++;
      },
      selectScore: (G: GameState, ctx: GameContext, category: ScoringCategory) => {
        // Don't allow the category to be selected if it's already been scored.
        if (G.players[ctx.currentPlayer].scoring[category] != null) return;

        // Calculate and allocate the correct score for the selected category
        const score = ScoreCalculator.calculators[category](G.dice);
        G.players[ctx.currentPlayer].scoring[category] = score;

        // Reset the state of the dice, then end the player's turn
        G.dice = Array(totalDice).fill(1);
        G.diceHeld = Array(totalDice).fill(false);
        G.totalRolls = 0;
        ctx.events.endTurn();
      },
      toggleDie: (G: GameState, ctx: GameContext, dieIndex: number) => {
        // Don't allow the holding or unholding of die if the player hasn't rolled yet or has finished rolling
        if (G.totalRolls === 0 || G.totalRolls >= 3) return;

        // Flip from held to not held, or not held to held
        G.diceHeld[dieIndex] = !G.diceHeld[dieIndex];
      }
    },
    endIf: (G: GameState, ctx: GameContext) => {
      // If all players have all scoring categories set, the game is over
      const gameIsOver = G.players.every((p) => {
        return Object.keys(p.scoring).every((category) => {
          const scoringCategory = category as ScoringCategory;
          return p.scoring[scoringCategory] != null;
        })
      });
      if (gameIsOver) {
        // Calculate scores and determine the winner
        const scores = G.players.map((p) => ScoreCalculator.calculateTotal(p));
        const topScore = max(scores) ?? 0;
        if (scores.filter((score) => score === topScore).length >= 2) {
          return { draw: true }
        } else {
          const winner = G.players[scores.indexOf(topScore)]
          return { winner: winner.id };
        }
      }
    }
  };
}

const createClient = (numberOfPlayers: number) => {
  return BgReact.Client({
    game: createGame(numberOfPlayers),
    numPlayers: numberOfPlayers,
    board: Board,
    debug: false
  });
}

export default createClient;
