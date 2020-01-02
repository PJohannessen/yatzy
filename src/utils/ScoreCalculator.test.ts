import { ScoreCalculator } from "./ScoreCalculator";
import { Player } from "../types/Player";

describe('ScoringCalculator', () => {

  describe('Ones', () => {

    const calculate = ScoreCalculator.calculators['ones'];

    test('calculates no ones correctly', () => {
      const dice = [2, 3, 4, 5, 6];
      expect(calculate(dice)).toBe(0);
    });

    test('calculates two ones correctly', () => {
      const dice = [1, 1, 4, 5, 6];
      expect(calculate(dice)).toBe(2);
    });

    test('calculates all ones correctly', () => {
      const dice = [1, 1, 1, 1, 1];
      expect(calculate(dice)).toBe(5);
    });

  });

  describe('Twos', () => {

    const calculate = ScoreCalculator.calculators['twos'];

    test('calculates no twos correctly', () => {
      const dice = [1, 3, 4, 5, 6];
      expect(calculate(dice)).toBe(0);
    });

    test('calculates two twos correctly', () => {
      const dice = [2, 2, 4, 5, 6];
      expect(calculate(dice)).toBe(4);
    });

    test('calculates all twos correctly', () => {
      const dice = [2, 2, 2, 2, 2];
      expect(calculate(dice)).toBe(10);
    });

  });

  describe('Threes', () => {

    const calculate = ScoreCalculator.calculators['threes'];

    test('calculates no threes correctly', () => {
      const dice = [1, 2, 4, 5, 6];
      expect(calculate(dice)).toBe(0);
    });

    test('calculates two threes correctly', () => {
      const dice = [3, 3, 4, 5, 6];
      expect(calculate(dice)).toBe(6);
    });

    test('calculates all threes correctly', () => {
      const dice = [3, 3, 3, 3, 3];
      expect(calculate(dice)).toBe(15);
    });

  });

  describe('Fours', () => {

    const calculate = ScoreCalculator.calculators['fours'];

    test('calculates no fours correctly', () => {
      const dice = [1, 2, 3, 5, 6];
      expect(calculate(dice)).toBe(0);
    });

    test('calculates two fours correctly', () => {
      const dice = [3, 4, 4, 5, 6];
      expect(calculate(dice)).toBe(8);
    });

    test('calculates all ones correctly', () => {
      const dice = [4, 4, 4, 4, 4];
      expect(calculate(dice)).toBe(20);
    });

  });

  describe('Fives', () => {

    const calculate = ScoreCalculator.calculators['fives'];

    test('calculates no fives correctly', () => {
      const dice = [1, 2, 3, 4, 6];
      expect(calculate(dice)).toBe(0);
    });

    test('calculates two fives correctly', () => {
      const dice = [1, 2, 3, 5, 5];
      expect(calculate(dice)).toBe(10);
    });

    test('calculates all fives correctly', () => {
      const dice = [5, 5, 5, 5, 5];
      expect(calculate(dice)).toBe(25);
    });

  });

  describe('Sixes', () => {

    const calculate = ScoreCalculator.calculators['sixes'];

    test('calculates no sixes correctly', () => {
      const dice = [1, 2, 3, 4, 5];
      expect(calculate(dice)).toBe(0);
    });

    test('calculates two sixes correctly', () => {
      const dice = [3, 4, 5, 6, 6];
      expect(calculate(dice)).toBe(12);
    });

    test('calculates all sixes correctly', () => {
      const dice = [6, 6, 6, 6, 6];
      expect(calculate(dice)).toBe(30);
    });

  });

  describe('One Pair', () => {
    const calculate = ScoreCalculator.calculators['onePair'];

    test('calculates all different correctly', () => {
      const dice = [1, 2, 3, 4, 5];
      expect(calculate(dice)).toBe(0);
    });

    test('calculates one pair correctly', () => {
      const dice = [1, 1, 2, 3, 4];
      expect(calculate(dice)).toBe(2);
    });

    test('calculates two pair correctly', () => {
      const dice = [1, 1, 2, 2, 3];
      expect(calculate(dice)).toBe(4);
    });

    test('calculates yatzy correctly', () => {
      const dice = [1, 1, 1, 1, 1];
      expect(calculate(dice)).toBe(2);
    });
  });

  describe('Two Pairs', () => {
    const calculate = ScoreCalculator.calculators['twoPairs'];

    test('calculates all different correctly', () => {
      const dice = [1, 3, 4, 5, 6];
      expect(calculate(dice)).toBe(0);
    });

    test('calculates two pairs correctly', () => {
      const dice = [1, 1, 2, 2, 3];
      expect(calculate(dice)).toBe(6);
    });

    test('calculates full house correctly', () => {
      const dice = [1, 1, 1, 2, 2];
      expect(calculate(dice)).toBe(6);
    });

    test('calculates four of a kind correctly', () => {
      const dice = [1, 1, 1, 1, 2];
      expect(calculate(dice)).toBe(0);
    });
  });

  describe('Three of a Kind', () => {
    const calculate = ScoreCalculator.calculators['threeOfAKind'];

    test('calculates all different correctly', () => {
      const dice = [1, 3, 4, 5, 6];
      expect(calculate(dice)).toBe(0);
    });

    test('calculates three of a kind correctly', () => {
      const dice = [1, 1, 1, 2, 2];
      expect(calculate(dice)).toBe(3);
    });

    test('calculates four of a kind correctly', () => {
      const dice = [1, 1, 1, 1, 2];
      expect(calculate(dice)).toBe(3);
    });

    test('calculates yatzy correctly', () => {
      const dice = [1, 1, 1, 1, 1];
      expect(calculate(dice)).toBe(3);
    });
  });

  describe('Four of a Kind', () => {
    const calculate = ScoreCalculator.calculators['fourOfAKind'];

    test('calculates all different correctly', () => {
      const dice = [1, 3, 4, 5, 6];
      expect(calculate(dice)).toBe(0);
    });

    test('calculates three of a kind correctly', () => {
      const dice = [1, 1, 1, 2, 2];
      expect(calculate(dice)).toBe(0);
    });

    test('calculates four of a kind correctly', () => {
      const dice = [1, 1, 1, 1, 2];
      expect(calculate(dice)).toBe(4);
    });

    test('calculates yatzy correctly', () => {
      const dice = [1, 1, 1, 1, 1];
      expect(calculate(dice)).toBe(4);
    });

  });

  describe('Small Straight', () => {
    const calculate = ScoreCalculator.calculators['smallStraight'];

    test('calculates all different correctly', () => {
      const dice = [1, 3, 4, 5, 6];
      expect(calculate(dice)).toBe(0);
    });

    test('calculates large straight correctly', () => {
      const dice = [2, 3, 4, 5, 6];
      expect(calculate(dice)).toBe(0);
    });

    test('calculates small straight correctly', () => {
      const dice = [1, 2, 3, 4, 5];
      expect(calculate(dice)).toBe(15);
    });

    test('calculates large straight out of order correctly', () => {
      const dice = [5, 3, 1, 4, 2];
      expect(calculate(dice)).toBe(15);
    });
  });

  describe('Large Straight', () => {
    const calculate = ScoreCalculator.calculators['largeStraight'];

    test('calculates all different correctly', () => {
      const dice = [1, 3, 4, 5, 6];
      expect(calculate(dice)).toBe(0);
    });

    test('calculates small straight correctly', () => {
      const dice = [1, 2, 3, 4, 5];
      expect(calculate(dice)).toBe(0);
    });

    test('calculates large straight correctly', () => {
      const dice = [2, 3, 4, 5, 6];
      expect(calculate(dice)).toBe(20);
    });

    test('calculates large straight out of order correctly', () => {
      const dice = [6, 4, 2, 5, 3];
      expect(calculate(dice)).toBe(20);
    });

  });

  describe('Full House', () => {
    const calculate = ScoreCalculator.calculators['fullHouse'];

    test('calculates all different correctly', () => {
      const dice = [1, 2, 3, 4, 5];
      expect(calculate(dice)).toBe(0);
    });

    test('calculates four ones correctly', () => {
      const dice = [1, 1, 1, 1, 2];
      expect(calculate(dice)).toBe(0);
    });

    test('calculates all ones correctly', () => {
      const dice = [1, 1, 1, 1, 1];
      expect(calculate(dice)).toBe(0);
    });

    test('calculates ones full of twos correctly', () => {
      const dice = [1, 1, 1, 2, 2];
      expect(calculate(dice)).toBe(7);
    });

    test('calculates sixes full of fives correctly', () => {
      const dice = [6, 5, 6, 5, 6];
      expect(calculate(dice)).toBe(28);
    });
  });

  describe('chance', () => {
    const calculate = ScoreCalculator.calculators['chance'];

    test('calculates all different correctly', () => {
      const dice = [1, 2, 3, 4, 5];
      expect(calculate(dice)).toBe(15);
    });

    test('calculates four ones correctly', () => {
      const dice = [1, 1, 1, 1, 2];
      expect(calculate(dice)).toBe(6);
    });

    test('calculates all sixes correctly', () => {
      const dice = [6, 6, 6, 6, 6];
      expect(calculate(dice)).toBe(30);
    });
  });

  describe('yatzy', () => {
    const calculate = ScoreCalculator.calculators['yatzy'];

    test('calculates all different correctly', () => {
      const dice = [1, 2, 3, 4, 5];
      expect(calculate(dice)).toBe(0);
    });

    test('calculates four ones correctly', () => {
      const dice = [1, 1, 1, 1, 2];
      expect(calculate(dice)).toBe(0);
    });

    test('calculates all ones correctly', () => {
      const dice = [1, 1, 1, 1, 1];
      expect(calculate(dice)).toBe(50);
    });
  });

  describe('calculates', () => {
    const player: Player = {
      id: "0",
      name: "Player 1",
      scoring: {
        ones: 3,
        twos: 6,
        threes: 9,
        fours: 12,
        fives: 15,
        sixes: 18,
        onePair: 12,
        twoPairs: 24,
        threeOfAKind: 18,
        fourOfAKind: 24,
        smallStraight: 15,
        largeStraight: 20,
        fullHouse: 28,
        chance: 30,
        yatzy: 50,
      }
    };

    test('calculates upper section total correctly', () => {
      expect(ScoreCalculator.calculateUpperSectionTotal(player)).toBe(63);
    });

    test('calculates upper section bonus correctly', () => {
      expect(ScoreCalculator.calculateUpperSectionBonus(player)).toBe(50);
    });

    test('calculates lower section total correctly', () => {
      expect(ScoreCalculator.calculateLowerSectionTotal(player)).toBe(221);
    });

    test('calculates total correctly', () => {
      expect(ScoreCalculator.calculateTotal(player)).toBe(334);
    });
  });

});
