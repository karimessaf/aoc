// https://adventofcode.com/2022/day/2

const fs = require('fs')
const sum = require('lodash/sum')

// Common
const file = fs.readFileSync(require.resolve('./input.txt'), 'utf8')
const array = (file.split(/\r?\n/))
array.pop()

const playScore = { A: 1, B: 2, C: 3, X: 1, Y: 2, Z: 3 }

const getResult = (op, me) => {
  if (playScore[op] === playScore[me]) return 3
  if (op === 'A') { return me === 'Z' ? 0 : 6 }
  if (op === 'B') { return me === 'X' ? 0 : 6 }
  if (op === 'C') { return me === 'Y' ? 0 : 6 }
}

// Part 1
const part1Result = sum(array.map(x => {
  const [op, me] = x.split(" ")
  return getResult(op, me) + playScore[me]
}))
console.log('part1Result', part1Result)

// Part 2:
const part2Result = sum(array.map(x => {
  const [op, me] = x.split(" ")
  const getRightPlay = (op, me) => {
    if (me === 'Y') return (op === 'A' && 'X') || (op === 'B' && 'Y') || (op === 'C' && 'Z') // draw
    if ((op === 'C' && me === 'Z') || (op === 'B' && me === 'X')) return 'X'
    if ((op === 'A' && me === 'Z') || (op === 'C' && me === 'X')) return 'Y'
    if ((op === 'A' && me === 'X') || (op === 'B' && me === 'Z')) return 'Z'
  }

  const rightPlay = getRightPlay(op, me)
  return getResult(op, rightPlay) + playScore[rightPlay]
}))
console.log('part2Result', part2Result)
