const fs = require('fs')
const uniq = require('lodash/uniq')

const dataStream = fs.readFileSync(require.resolve('./input.txt'), 'utf8')
const array = dataStream.split('')

// Part 1
let part1Solution
for (let i = 0; i < array.length; i++) {
  const marker = uniq(array.slice(i, i + 4)).length
  if (marker === 4) { part1Solution = i + 4; break; }
}
console.log('part1Solution', part1Solution)

// Part 2
let part2Solution
for (let i = 0; i < array.length; i++) {
  const marker = uniq(array.slice(i, i + 14)).length
  if (marker === 14) { part2Solution = i + 14; break; }
}
console.log('part2Solution', part2Solution)
