import { Player } from './Player';

export interface GameState {
  dice: number[]; // An array of 5 6-sided die
  diceHeld: boolean[]; // An array 5 booleans indicating whether that die is currently being held
  totalRolls: number; // The number of times the dice have been rolled on the current turn
  players: Player[]; // An array of players taking part in the game
}
