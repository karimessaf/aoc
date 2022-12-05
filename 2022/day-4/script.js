// https://adventofcode.com/2022/day/4

const fs = require('fs')

const file = fs.readFileSync(require.resolve('./input.txt'), 'utf-8')
const array = file.split('\n')
array.pop()

// Part 1
let part1Result = 0
array.forEach(x => {
  let [s1LB, s1UB] = x.split(',')[0].split('-').map(x => parseInt(x))
  let [s2LB, s2UB] = x.split(',')[1].split('-').map(x => parseInt(x))
  if ((s1LB <= s2LB) && (s1UB >= s2UB) || (s1LB >= s2LB) && (s1UB <= s2UB)) part1Result += 1
})
console.log('part1Result', part1Result)

// Part 2
let part2Result = 0
array.forEach(x => {
  let [s1LB, s1UB] = x.split(',')[0].split('-').map(x => parseInt(x))
  let [s2LB, s2UB] = x.split(',')[1].split('-').map(x => parseInt(x))
  const s1ContainsS2 = ((s1LB <= s2LB) && (s2LB <= s1UB)) || ((s1LB <= s2UB) && (s2UB <= s1UB))
  const s2ContainsS1 = ((s2LB <= s1LB) && (s1LB <= s2UB)) || ((s2LB <= s1UB) && (s1UB <= s2UB))
  if (s1ContainsS2 || s2ContainsS1) part2Result += 1
})
console.log('part2Result', part2Result)
