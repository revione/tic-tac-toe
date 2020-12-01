import React from 'react'
import styled from 'styled-components'
import Board from './Borad'

const Main = () => (
  <Container>
    <div></div>
    <Board />
  </Container>
)

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
`

export default Main
