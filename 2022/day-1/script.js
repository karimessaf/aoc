// https://adventofcode.com/2022/day/1

const fs = require('fs')
const sum = require('lodash/sum')
const max = require('lodash/max')

const file = fs.readFileSync('./input.txt', 'utf8')

// Part 1
const array = file.split(/\r?\n/)
let array2D = []
array.forEach(x => !!x ? array2D[array2D.length - 1]?.push(parseInt(x)) : array2D.push([]))

const array2DSum = array2D.map(x => sum(x))
const part1Result = max(array2DSum)
console.log('Part 1 result: ', part1Result)

// Part 2
const part2Result = sum(array2DSum.sort((a, b) => a - b).reverse().slice(0, 3))
console.log('Part 2 result: ', part2Result)
