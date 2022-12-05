const fs = require('fs')
const cloneDeep = require('lodash/cloneDeep')

const file = fs.readFileSync(require.resolve('./input.txt'), 'utf-8')
let [crates, moves] = file.split('\n\n')

// Transform input file's crates into a 2D array e.g. array[0] = ['P', 'G', 'D']
const cratesMatrix = crates.split('\n').map(x => x.split(''))
const transposedMatrix = cratesMatrix[0].map((_, colIndex) => cratesMatrix.map(row => row[colIndex]))
const crates2DArray = transposedMatrix.filter(x => !x.some(c => c === '[' || c === ']'))
  .filter(x => !x.every(c => c === ' ')).map(x => x.filter(c => c !== ' '))
crates2DArray.map(x => x.pop())

// Transform input file's moves into a 2D array e.g. array[0] = [2, 4, 6] (move 2 from 4 to 6)
const moves2DArray = moves.split('\n').map(move => move.split('').filter(x => /^\d+$/.test(x))).map(x => x.length > 3 ? [x[0]+x[1], x[2], x[3]] : x)
moves2DArray.pop()

// Part 1
const part1Crates = cloneDeep(crates2DArray)
moves2DArray.map(move => {
  Array.from(Array(parseInt(move[0]))).map((_, i) => {
    const crate = part1Crates[move[1] - 1].shift()
    part1Crates[move[2] - 1].unshift(crate)
  })
})
const part1Result = part1Crates.map(crate => crate[0]).join('')
console.log('part1Result', part1Result)

// Part 2
const part2Crates = cloneDeep(crates2DArray)
moves2DArray.map(move => {
  console.log(`NEW MOVE (moving ${move[0]}):`)
  let remainingCrates = move[0]
  for (let i = 0; i < Math.ceil(move[0] / 3); i++) {
    let movedCrates = []
    console.log(`iteration ${i+1}/${Math.ceil(move[0] / 3)}`)
    i === 0
      ? movedCrates = part2Crates[move[1] - 1].splice(0, Math.min(3, move[0])) // first move (1, 2, or 3)
      : movedCrates = part2Crates[move[1] - 1].splice(0, remainingCrates > 3 ? 3 : remainingCrates) // following moves (if +3 crates)
    remainingCrates -= 3
    part2Crates[move[2] - 1].unshift(...movedCrates)
    console.log(`from: ${part2Crates[move[1] - 1]}`)
    console.log(`crates: ${movedCrates} (remaining: ${remainingCrates})`)
    console.log(`to: ${part2Crates[move[2] - 1]}`)
    console.log('')
  }
})

const part2Result = part2Crates.map(crate => crate[0]).join('')
console.log('part2Result', part2Result)
