import React from 'react'
import styled from 'styled-components'

const Header = () => (
  <Container>
    <h1>Tic Tac Toe</h1>
    <ContainerButtons>
      <Button selected={true}>2 Players</Button>
      <Button selected={false}>vs Computer</Button>
    </ContainerButtons>
  </Container>
)

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

  padding: 20px;
  border-radius: 5px;

  background-color: ${({ selected }) => (selected ? 'blue' : '')};
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
    background-color: ${({ selected }) => (selected ? '' : 'gray')};
    cursor: ${({ selected }) => (selected ? '' : 'pointer')};
  }
`

export default Header
