import React from 'react'
import styled from 'styled-components'

const Board = () => (
  <Container>
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

const Cell = ({ index }) => {
  let icon = 'I'
  return <Button className={`cell-${index}`}>{icon}</Button>
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
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
  color: transparent;

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
