import React from 'react'
import styled from 'styled-components'

const Footer = () => (
  <Container>
    <Link href='https://github.com/revione/tic-tac-toe' alt='repository game'>
      Github
    </Link>
  </Container>
)

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
`

const Link = styled.a`
  color: #fff;
  text-decoration: none;

  &:hover {
    color: #afafaf;
  }
`

export default Footer
