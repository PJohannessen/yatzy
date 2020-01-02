import groupBy from 'lodash/groupBy';
import isEqual from 'lodash/isEqual';
import orderBy from 'lodash/orderBy';
import sum from 'lodash/sum';
import { Player } from '../types/Player';
import { ScoringCategory, ScoringCategoryDescriptions } from '../types/Scoring';

export interface IScoreCalculator {
  calculateUpperSectionTotal: (player: Player) => number;
  calculateUpperSectionBonus: (player: Player) => number;
  calculateLowerSectionTotal: (player: Player) => number;
  calculateTotal: (player: Player) => number;
  calculators: Record<ScoringCategory, (dice: number[]) => number>;
}

const groupDice = (dice: number[]) => {
  // Group dice by their value, then order them by the count of each value showing (descending)
  const grouped = groupBy(dice);
  let result: number[][] = [];
  for (let d = 1; d <= 6; d++) {
    if (grouped[d]) result.push(grouped[d]);
  }
  result = orderBy(result, (arr) => arr.length, "desc");
  return result;
};

export const ScoreCalculator: IScoreCalculator = {
  calculateUpperSectionTotal: (player: Player) => {
    const upperTotal = ScoringCategoryDescriptions
      .filter((scd) => scd.section === "Upper")
      .map((scd) => player.scoring[scd.category] ?? 0)
      .reduce((total, previous) => (total ?? 0) + (previous ?? 0)) ?? 0;
      return upperTotal;
  },
  calculateUpperSectionBonus: (player: Player) => {
    const upperTotal = ScoreCalculator.calculateUpperSectionTotal(player);
    const upperBonus = upperTotal >= 63 ? 50 : 0;
    return upperBonus;
  },
  calculateLowerSectionTotal: (player: Player) => {
    const lowerTotal = ScoringCategoryDescriptions
      .filter((scd) => scd.section === "Lower")
      .map((scd) => player.scoring[scd.category] ?? 0)
      .reduce((total, previous) => (total ?? 0) + (previous ?? 0)) ?? 0;
      return lowerTotal;
  },
  calculateTotal: (player: Player) => {
    const upperTotal = ScoreCalculator.calculateUpperSectionTotal(player);
    const upperBonus = ScoreCalculator.calculateUpperSectionBonus(player);
    const lowerTotal = ScoreCalculator.calculateLowerSectionTotal(player);;
    const finalTotal = upperTotal + upperBonus + lowerTotal;
    return finalTotal;
  },
  calculators: {
    "ones": (dice: number[]) => {
      // Sum all dice showing 1
      return sum(dice.filter((d) => d === 1));
    },
    "twos": (dice: number[]) => {
      // Sum all dice showing 2
      return sum(dice.filter((d) => d === 2));
    },
    "threes": (dice: number[]) => {
      // Sum all dice showing 3
      return sum(dice.filter((d) => d === 3));
    },
    "fours": (dice: number[]) => {
      // Sum all dice showing 4
      return sum(dice.filter((d) => d === 4));
    },
    "fives": (dice: number[]) => {
      // Sum all dice showing 5
      return sum(dice.filter((d) => d === 5));
    },
    "sixes": (dice: number[]) => {
      // Sum all dice showing 6
      return sum(dice.filter((d) => d === 6));
    },
    "onePair": (dice: number[]) => {
      // Sum of two identical dice. As there may be two pairs, take the highest scoring pair.
      let score = 0;
      const groupedDice = groupDice(dice);
      if (groupedDice[0].length >= 2) score = groupedDice[0][0] * 2;
      if (groupedDice.length >= 2 &&
        groupedDice[1].length >= 2 &&
        groupedDice[1][0] > groupedDice[0][0]) score = groupedDice[1][0] * 2;
      return score;
    },
    "twoPairs": (dice: number[]) => {
      // Sum of two pair, otherwise 0
      let score = 0;
      const groupedDice = groupDice(dice);
      if (groupedDice.length >= 2 &&
        groupedDice[0].length >= 2 &&
        groupedDice[1].length === 2) score = groupedDice[0][0] * 2 + groupedDice[1][0] * 2;
      return score;
    },
    "threeOfAKind": (dice: number[]) => {
      // Sum of 3 identical dice, otherwise 0
      let score = 0;
      const groupedDice = groupDice(dice);
      if (groupedDice[0].length >= 3) score = groupedDice[0][0] * 3;
      return score;
    },
    "fourOfAKind": (dice: number[]) => {
      // Sum of 4 identical dice, otherwise 0
      let score = 0;
      const groupedDice = groupDice(dice);
      if (groupedDice[0].length >= 4) score = groupedDice[0][0] * 4;
      return score;
    },
    "smallStraight": (dice: number[]) => {
      // Score 15 if small straight [1, 2, 3, 4, 5] is showing
      const orderedDice = orderBy(dice);
      let score = 0;
      if (isEqual(orderedDice, [1, 2, 3, 4, 5])) score = 15;
      return score;
    },
    "largeStraight": (dice: number[]) => {
      // Score 20 if large straight [2, 3, 4, 5, 6] is showing
      const orderedDice = orderBy(dice);
      let score = 0;
      if (isEqual(orderedDice, [2, 3, 4, 5, 6])) score = 20;
      return score;
    },
    "fullHouse": (dice: number[]) => {
      // Sum of all dice, if there is a separate three of a kind and one pair
      let score = 0;
      const groupedDice = groupDice(dice);
      if (groupedDice.length === 2 &&
        groupedDice[0].length === 3 &&
        groupedDice[1].length === 2) score = sum(dice);
      return score;
    },
    "chance": (dice: number[]) => {
      // Sum all dice, regardless of value
      return sum(dice);
    },
    "yatzy": (dice: number[]) => {
      // Score 50 if all dice are the same, otherwise 0
      let score = 0;
      const groupedDice = groupDice(dice);
      if (groupedDice[0].length === 5) score = 50;
      return score;
    },
  },
};
