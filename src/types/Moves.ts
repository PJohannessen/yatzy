import { ScoringCategory } from "./Scoring";

export interface Moves {
  rollDice: () => void;
  selectScore: (category: ScoringCategory) => void;
  toggleDie: (die: number) => void;
}
