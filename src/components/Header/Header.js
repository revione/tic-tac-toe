import React, { useContext } from 'react'
import styled from 'styled-components'
import { GAME_TYPES } from '../../common'
import { AppContext } from '../../context'

const Header = () => {
  const ctx = useContext(AppContext)

  return (
    <Container>
      <h1>Tic Tac Toe</h1>
      <ContainerButtons>
        <Button
          selected={ctx.gameType === GAME_TYPES.TWO_PLAYERS}
          onClick={() => ctx.changeType(GAME_TYPES.TWO_PLAYERS)}>
          2 Players
        </Button>
        <Button
          selected={ctx.gameType === GAME_TYPES.VERSUS_COMPUTER}
          onClick={() => ctx.changeType(GAME_TYPES.VERSUS_COMPUTER)}>
          vs Computer
        </Button>
      </ContainerButtons>
      <ButtonNewGame onClick={() => ctx.newGame()}>New Game</ButtonNewGame>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const ContainerButtons = styled.div`
  display: flex;
  justify-content: center;
`

const Button = styled.button`
  background-color: transparent;
  border: 1px solid black;
  color: #e0e0e0;

  padding: 10px 20px;
  border-radius: 3px;
  background-color: ${({ selected }) => (selected ? '#11118e' : '')};
  outline: none;

  &:first-child {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  &:last-child {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  &:hover {
    background-color: ${({ selected }) => (selected ? '' : '#111165')};
    cursor: ${({ selected }) => (selected ? '' : 'pointer')};
  }
`

const ButtonNewGame = styled.button`
  background-color: transparent;
  border: 1px solid black;
  color: #e0e0e0;

  padding: 10px 20px;
  border-radius: 3px;
  margin-top: 20px;
  background-color: green;
  outline: none;

  &:hover {
    background-color: #144c14;
    cursor: pointer;
  }
`

export default Header
