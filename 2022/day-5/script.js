const fs = require('fs')
const cloneDeep = require('lodash/cloneDeep')

const file = fs.readFileSync(require.resolve('./input.txt'), 'utf-8')
let [crates, moves] = file.split('\n\n')

// Transform input file's crates into a 2D array e.g. array[0] = ['P', 'G', 'R', 'N']
const cratesMatrix = crates.split('\n').map(x => x.split(''))
const transposedMatrix = cratesMatrix[0].map((_, colIndex) => cratesMatrix.map(row => row[colIndex]))
const crates2DArray = transposedMatrix.map(row => row.filter(c => /^[A-Z]*$/.test(c))).filter(x => x.length)

// Transform input file's moves into a 2D array e.g. array[0] = [2, 4, 6] (move 2 from 4 to 6)
const moves2DArray = moves.split('\n').map(move => move.split('').filter(x => /^\d+$/.test(x))).map(x => x.length > 3 ? [x[0]+x[1], x[2], x[3]] : x)
moves2DArray.pop()

// Part 1
const part1Crates = cloneDeep(crates2DArray)
moves2DArray.map(move => {
  Array.from(Array(parseInt(move[0]))).forEach(_ => {
    const crate = part1Crates[move[1] - 1].shift()
    part1Crates[move[2] - 1].unshift(crate)
  })
})
console.log('part1Result', part1Crates.map(crate => crate[0]).join(''))

// Part 2
const part2Crates = cloneDeep(crates2DArray)
moves2DArray.map(move => {
  const crates = part2Crates[move[1] - 1].splice(0, move[0])
  part2Crates[move[2] - 1].unshift(...crates)
})
console.log('part2Result', part2Crates.map(crate => crate[0]).join(''))


// Part 3?
/* for whatever reason, when reading part 2, I assumed that the crane can move a maximum of 3 crates,
  so I wrote the following algorithm */

// const part3Crates = cloneDeep(crates2DArray)
// moves2DArray.map(move => {
//   console.log(`\n---NEW MOVE (move ${move[0]} from ${move[1]} -> ${move[2]})`)
//   let remainingCrates = move[0]
//   for (let i = 0; i < Math.ceil(move[0] / 3); i++) {
//     let movedCrates = []
//     console.log(`iteration ${i+1}/${Math.ceil(move[0] / 3)}`)
//     console.log(`from: ${part3Crates[move[1] - 1]}`)
//     i === 0
//       ? movedCrates = part3Crates[move[1] - 1].splice(0, Math.min(3, move[0])) // first move (1, 2, or 3)
//       : movedCrates = part3Crates[move[1] - 1].splice(0, remainingCrates > 3 ? 3 : remainingCrates) // following moves (if +3 crates)
//     remainingCrates -= 3
//     part3Crates[move[2] - 1].unshift(...movedCrates)
//     console.log(`crates: ${movedCrates} (remaining: ${remainingCrates})`)
//     console.log(`to: ${part3Crates[move[2] - 1]}`)
//     console.log('')
//   }
// })
