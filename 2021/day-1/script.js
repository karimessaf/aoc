// https://adventofcode.com/2021/day/1

const fs = require('fs')
const sum = require('lodash/sum')

// Common
const file = fs.readFileSync(require.resolve('./input.txt'), 'utf-8')
const array = file.split('\n')
// console.log('array', array)

// Part 1
const increases = array.map((x, i) => (i === 0 || parseInt(x) <= parseInt(array[i - 1])) ? 0 : 1)
array.map((x,i) => console.log(`i:${i}, x${parseInt(x)}, x-1:${parseInt(array[i-1])}, result:${parseInt(x)<parseInt(array[i-1]) ? 0 : 1}`))
console.log('part1Result: ', sum(increases))
