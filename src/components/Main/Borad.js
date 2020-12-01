import React, { useContext, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { ICON_CHARS, ICON_PLACE_HOLDDER } from '../../common'
import { AppContext } from '../../context'

const Board = () => {
  const ctx = useContext(AppContext)
  const boardRef = useRef(null)

  useEffect(() => {
    let timer = null
    if (ctx.gameState.position !== '') {
      timer = setTimeout(() => boardRef.current.classList.add('full'), 50)
    } else {
      boardRef.current.classList.remove('full')
    }
    return () => {
      clearTimeout(timer)
    }
  }, [ctx.gameState.position])

  return (
    <Container ref={boardRef} className={`${ctx.gameState.position}`}>
      <Row>
        <Cell index={0} />
        <Cell index={1} />
        <Cell index={2} />
      </Row>

      <Row>
        <Cell index={3} />
        <Cell index={4} />
        <Cell index={5} />
      </Row>

      <Row>
        <Cell index={6} />
        <Cell index={7} />
        <Cell index={8} />
      </Row>
    </Container>
  )
}

const Cell = ({ index }) => {
  const ctx = useContext(AppContext)

  const value = ctx.cells[index]
  const icon = value !== null ? ICON_CHARS[value] : ICON_PLACE_HOLDDER
  const isDone = icon !== ICON_PLACE_HOLDDER ? 'done' : ''

  return (
    <Button done={isDone} className={`cell-${index}`} onClick={() => ctx.humanPlay(index)}>
      {icon}
    </Button>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;

  /* Draw winning line*/

  position: relative;

  &::after {
    content: '';
    position: absolute;
    background-color: #2ab7ca;
    transition: 0.7s;
    -webkit-transition: 0.7s;
    -moz-transition: 0.7s;
    -o-transition: 0.7s;
  }

  /* Horizonal Lines */

  &.h::after {
    width: 0%;
    height: 3px;
    left: 0;
    transform: translateY(-50%);
  }

  &.h.full::after {
    width: 100%;
  }

  &.h0::after {
    top: calc(100% / 6);
  }

  &.h1::after {
    top: 50%;
  }

  &.h2::after {
    top: calc(5 * 100% / 6);
  }

  /* Vertical Lines */

  &.v::after {
    height: 0%;
    width: 3px;
    top: 0;
    transform: translateX(-50%);
  }

  &.v.full::after {
    height: 100%;
  }

  &.v0::after {
    left: calc(100% / 6);
  }

  &.v1::after {
    left: 50%;
  }

  &.v2::after {
    left: calc(5 * 100% / 6);
  }

  /* Diagonal Lines */

  &.d0::after {
    height: 0%;
    width: 3px;
    left: 0;
    top: 0;
    transform: rotateZ(-45deg);
    transform-origin: 50% 0;
    transition: height 0.7s;
    -webkit-transition: height 0.7s;
    -moz-transition: height 0.7s;
    -o-transition: height 0.7s;
  }

  &.d0.full::after {
    height: 140%;
  }

  &.d1::after {
    height: 0%;
    width: 3px;
    right: 0;
    top: 0;
    transform: rotateZ(45deg);
    transform-origin: 50% 0;
    transition: height 0.7s;
    -webkit-transition: height 0.7s;
    -moz-transition: height 0.7s;
    -o-transition: height 0.7s;
  }

  &.d1.full::after {
    height: 140%;
  }
`

const Row = styled.div`
  display: flex;
  justify-content: center;
`

const Button = styled.div`
  flex: 1 1;
  padding-top: calc(100% / 6 - 2.9rem);
  padding-bottom: calc(100% / 6 - 2.9rem);
  font-size: 5rem;
  line-height: 5.7rem;
  background-color: transparent;
  border: none;
  outline: none;
  border: 2px solid #fff;
  margin-left: -2px;
  margin-top: -2px;
  text-align: center;
  color: ${({ done }) => (done ? '#fff' : 'transparent')};

  &:hover {
    cursor: pointer;
    background-color: #111;
  }

  &.cell-0,
  &.cell-1,
  &.cell-2 {
    border-top: none;
  }

  &.cell-2,
  &.cell-5,
  &.cell-8 {
    border-right: none;
  }

  &.cell-8,
  &.cell-7,
  &.cell-6 {
    border-bottom: none;
  }

  &.cell-0,
  &.cell-3,
  &.cell-6 {
    border-left: none;
  }
`

export default Board
