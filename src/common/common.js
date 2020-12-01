export const GAME_TYPES = {
  TWO_PLAYERS: 0,
  VERSUS_COMPUTER: 1
}

export const ICON_TYPES = {
  O: 0,
  X: 1
}

export const THINKING_TIME = 500

export const ICON_PLACE_HOLDDER = 'I'

export const ICON_CHARS = ['O', 'X']

export const PLAYER_TURNS = {
  HUMAN: 0,
  COMPUTER: 1
}

const getEmptyCells = cells => {
  return cells.map((val, idx) => [val, idx]).filter(item => item[0] === null)
}

const isMoveLeft = cells => {
  const emptyCells = getEmptyCells(cells)
  return emptyCells.length > 0
}

export const checkGameState = cells => {
  const lines = [
    [0, 1, 2], // h.h0
    [3, 4, 5], // h.h1
    [6, 7, 8], // h.h2
    [0, 3, 6], // v.v0
    [1, 4, 7], // v.v1
    [2, 5, 8], // v.v2
    [0, 4, 8], // d.d0
    [2, 4, 6] // d.d1
  ]

  let position = ''

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]

    if (cells[a] !== null && cells[a] === cells[b] && cells[a] === cells[c]) {
      if (i >= 0 && i <= 2) position = `h h${i}`
      else if (i >= 3 && i <= 5) position = `v v${i - 3}`
      else position = `d${i - 6}`

      return {
        position,
        iconType: cells[a],
        isTie: null
      }
    }
  }

  return {
    position: '',
    iconType: null,
    isTie: isMoveLeft(cells) ? null : true
  }
}

export const getRandom = (start, end) => {
  return start + Math.floor(Math.random() * (end - start))
}

export const replace = (cells, index, value) => {
  return [...cells.slice(0, index), value, ...cells.slice(index + 1, cells.length)]
}

/**
 * Random move
 */
export const findRandomMove = cells => {
  const emptyCells = getEmptyCells(cells)

  if (emptyCells.length > 0) {
    const randomNum = getRandom(0, emptyCells.length)
    const index = emptyCells[randomNum][1]

    return index
  }

  return null
}

/**
 * Find best move based on Minimax algorithm
 */
const evaluate = (cells, computerType) => {
  const lines = [
    [0, 1, 2], // h.h0
    [3, 4, 5], // h.h1
    [6, 7, 8], // h.h2
    [0, 3, 6], // v.v0
    [1, 4, 7], // v.v1
    [2, 5, 8], // v.v2
    [0, 4, 8], // d.d0
    [2, 4, 6] // d.d1
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]

    if (cells[a] !== null && cells[a] === cells[b] && cells[a] === cells[c]) {
      if (cells[a] === computerType) return 10
      return -10
    }
  }

  return 0
}

// let counter = 0
const minimax = (cells, depth, alpha, beta, computerType, isMax) => {
  const score = evaluate(cells, computerType)
  // counter++
  // console.log(`score: ${score} depth: ${depth} computerType: ${computerType} isMax: ${isMax}`)

  // If Maximizer has won the game return his/her evaluated score
  if (score === 10) return score - depth

  // If Minimizer has won the game return his/her evaluated score
  if (score === -10) return score + depth

  // If there are no more moves and no winner then it is a tie
  if (!isMoveLeft(cells)) return 0

  const lengthCells = cells.length
  let best

  // If this maximizer's move
  if (isMax) {
    best = -1000

    for (let i = 0; i < lengthCells; i++) {
      const cell = cells[i]

      if (cell === null) {
        // Make a move
        const nextCells = replace(cells, i, computerType)
        const value = minimax(nextCells, depth + 1, alpha, beta, computerType, !isMax)
        // Call minimax recursively and choose the maximum value
        best = Math.max(best, value)
        alpha = Math.max(alpha, value)

        if (beta <= alpha) break
        // console.log(
        //   `max => best: ${best}, depth: ${depth}, computerType: ${computerType}, isMax: ${isMax}`
        // )
      }
    }
  } else {
    best = 1000

    for (let i = 0; i < lengthCells; i++) {
      const cell = cells[i]

      if (cell === null) {
        // Make a move
        const nextCells = replace(cells, i, 1 - computerType)
        const value = minimax(nextCells, depth + 1, alpha, beta, computerType, !isMax)
        // Call minimax recursively and choose the minimum value
        best = Math.min(best, value)
        beta = Math.min(beta, value)

        if (beta <= alpha) break
        // console.log(
        //   `min => best: ${best}, depth: ${depth}, computerType: ${computerType}, isMax: ${isMax}`
        // )
      }
    }
  }

  // console.log(`counter =>  ${counter}`)

  return best
}

export const findBestMove = (cells, computerType) => {
  let bestVal = -1000
  let bestMove = null

  const lengthCells = cells.length

  for (let i = 0; i < lengthCells; i++) {
    const cell = cells[i]

    if (cell === null) {
      // Make a move
      const nextCells = replace(cells, i, computerType)

      // Compute evaluation function for this move.
      const moveVal = minimax(nextCells, 0, -Infinity, +Infinity, computerType, false)

      // console.log(`moveVal:  ${moveVal} i => ${i}`)

      // If the value of the current move is more than the best value, then update best
      if (moveVal > bestVal) {
        bestVal = moveVal
        bestMove = i
        // console.log(`bestMove:  ${bestMove}`)
      }
    }
  }

  return bestMove
}
