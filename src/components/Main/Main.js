import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import Board from './Borad'
import { GAME_TYPES, PLAYER_TURNS, ICON_CHARS } from '../../common'
import { AppContext } from '../../context'

const Main = () => {
  const ctx = useContext(AppContext)
  const [info, setInfo] = useState('')

  useEffect(() => {
    if (ctx.gameState.isTie) {
      setInfo('Tie!')
    } else {
      if (ctx.gameType === GAME_TYPES.TWO_PLAYERS) {
        if (ctx.gameState.position === '') {
          setInfo(`It's player(${ICON_CHARS[ctx.currentIcon]}) turn`)
        } else {
          setInfo(`Player(${ICON_CHARS[1 - ctx.currentIcon]}) wins!`)
        }
      } else {
        if (ctx.gameState.position === '') {
          if (ctx.playerTurn === PLAYER_TURNS.HUMAN) setInfo(`It's your turn`)
          else setInfo(`It's computer turn`)
        } else {
          if (ctx.playerTurn === PLAYER_TURNS.HUMAN) setInfo(`Computer win!`)
          else setInfo(`You win!`)
        }
      }
    }
  }, [ctx])

  return (
    <Container>
      <TextInfo>{info}</TextInfo>
      <Board />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
  max-width: 350px;
  margin: 20px auto;
`

const TextInfo = styled.h2`
  margin: 10px 0 30px;
  font-size: 1.25rem;
  font-weight: normal;
`

export default Main
