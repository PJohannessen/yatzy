import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { GameState } from '../types/GameState';
import { Moves } from '../types/Moves';
import { Dice, DiceButton, RollButton, Scorecard } from '.';
import { GameContext } from '../types/GameContext';

interface BoardProps {
  ctx: GameContext;
  G: GameState;
  moves: Moves;
}

const Board: React.FC<BoardProps> = ({ ctx, G, moves }) => {
  let diceRows = [];
  const canRoll = G.totalRolls < 3 && !ctx.gameover;
  const canHold = G.totalRolls > 0 && G.totalRolls < 3 && !ctx.gameover;

  for (let d = 0; d < G.dice.length; d++) {
    diceRows.push(
      <Row key={`dice-${d}`}>
        <StyledCol xs={12}>
          <Dice value={G.dice[d]} />
        <DiceButton disabled={!canHold} isHeld={G.diceHeld[d]} onClick={() => moves.toggleDie(d)}  />
        </StyledCol>
      </Row>
    );
  }

  let turnDetails = !ctx.gameover ? (
    <>
      <p>{G.players[ctx.currentPlayer].name}'s turn</p>
      <p>{3 - G.totalRolls} rolls remaining</p>
    </>
  ) : null;

  let winner = ctx.gameover ? (
    <div>
      <strong>{G.players[ctx.gameover.winner].name} is the winner!</strong>
    </div>
  ) : null;

  return (
    <StyledContainer>
      <Row>
        <Col xs={12} md={4}>
          <StyledHeader>Yatzy</StyledHeader>
          <StyledRow>
            <StyledCol xs={12}>
              {turnDetails}
            </StyledCol>
          </StyledRow>
          {diceRows}
          <StyledRow>
            <StyledCol xs={12}>
              <RollButton
                disabled={!canRoll}
                onClick={moves.rollDice}
                totalRolls={G.totalRolls}
              />
            </StyledCol>
          </StyledRow>
          <StyledRow>
            {winner}
          </StyledRow>
        </Col>
        <StyledScorecardCol xs={12} md={8}>
          <Scorecard currentPlayer={ctx.currentPlayer.toString()} dice={G.dice} players={G.players} selectCategory={moves.selectScore} totalRolls={G.totalRolls} />
        </StyledScorecardCol>
      </Row>
    </StyledContainer>
  );
}

const StyledContainer = styled(Container)`
  margin-top: 1em;
`

const StyledHeader = styled.h1`
  text-align: center;
`;

const StyledCol = styled(Col)`
  text-align: center;
`;

const StyledScorecardCol = styled(Col)`
`;

const StyledRow = styled(Row)`
  padding-top: 1em;
  padding-bottom: 1em;
`;

export default Board;
