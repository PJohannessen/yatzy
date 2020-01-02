import React from 'react';
import { Table } from 'react-bootstrap';
import styled from 'styled-components';
import { ScorecardPointsCell, ScorecardSelectionCell, ScorecardCategoryCell } from '.';
import { Player, ScoringCategory, ScoringCategoryDescriptions} from '../../types';
import { ScoreCalculator } from '../../utils';

interface ScorecardProps {
  currentPlayer: string,
  dice: number[];
  players: Player[];
  selectCategory: (category: ScoringCategory) => void;
  totalRolls: number;
}

const Scorecard: React.FC<ScorecardProps> = ({ currentPlayer, dice, players, selectCategory, totalRolls }) => {
  const headers = players.map((p) => <th key={p.id}>{p.name}</th>);
  headers.unshift(<th key="header"></th>);

  const upperSectionRows = ScoringCategoryDescriptions.filter((scd => scd.section === "Upper")).map((scd) => {
    const cells = players.map((p) => {
      let cell: JSX.Element;
      let score = p.scoring[scd.category];
      if (p.id !== currentPlayer || score !== null || totalRolls === 0) {
        cell = <ScorecardPointsCell key={`p${p.id}-${scd.category}`} score={score} />;
      } else {
        score = ScoreCalculator.calculators[scd.category](dice);
        cell = <ScorecardSelectionCell key={`p${p.id}-${scd.category}`} category={scd.category} score={score} selectCategory={selectCategory} />;
      }

      return cell;
    });
    cells.unshift(<ScorecardCategoryCell key={scd.category} scd={scd} />);
    return <tr key={`row-${scd.category}`}>{cells}</tr>;
  });

  const lowerSectionRows = ScoringCategoryDescriptions.filter((scd) => scd.section === "Lower").map((scd) => {
    const cells = players.map((p) => {
      let cell: JSX.Element;
      let score = p.scoring[scd.category];
      if (p.id !== currentPlayer || score !== null || totalRolls === 0) {
        cell = <ScorecardPointsCell key={`p${p.id}-${scd.category}`} score={score} />;
      } else {
        score = ScoreCalculator.calculators[scd.category](dice);
        cell = <ScorecardSelectionCell key={`p${p.id}-${scd.category}`} category={scd.category} score={score} selectCategory={selectCategory} />;
      }

      return cell;
    });
    cells.unshift(<ScorecardCategoryCell key={scd.category} scd={scd} />);
    return <tr key={`row-${scd.category}`}>{cells}</tr>;
  });

  const upperSectionTotals = players.map((p) => {
    const total = ScoreCalculator.calculateUpperSectionTotal(p);
    return <td key={`p${p.id}-upper`}><em>{total}</em></td>;
  });

  const upperSectionBonuses = players.map((p) => {
    const bonus = ScoreCalculator.calculateUpperSectionBonus(p);
    return <td key={`p${p.id}-upperbonus`}><em>{bonus}</em></td>;
  })

  const lowerSectionTotals = players.map((p) => {
    const total = ScoreCalculator.calculateLowerSectionTotal(p);
    return <td key={`p${p.id}-lower`}><em>{total}</em></td>;
  });

  const totals = players.map((p) => {
    const total = ScoreCalculator.calculateTotal(p);
    return <td key={`p${p.id}-total`}><strong>{total}</strong></td>;
  });

  return (
    <StyledTable size="sm" responsive>
      <thead>
        <tr>
          {headers}
        </tr>
      </thead>
      <tbody>
        {upperSectionRows}
        <tr><td><em>Upper Section Total</em></td>{upperSectionTotals}</tr>
        <tr><td><em>Upper Section Bonus</em></td>{upperSectionBonuses}</tr>
        {lowerSectionRows}
        <tr><td><em>Lower Section Total</em></td>{lowerSectionTotals}</tr>
        <tr><td><strong>Grand Total</strong></td>{totals}</tr>
      </tbody>
    </StyledTable>
  );
};

const StyledTable = styled(Table)`
  td {
    padding: .2em !important;
  }
`;

export default Scorecard;
