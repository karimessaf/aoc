// https://adventofcode.com/2022/day/8/answer

const fs = require('fs')
const cloneDeep = require('lodash/cloneDeep')

const file = fs.readFileSync(require.resolve('./input.txt'), 'utf8')
const array = file.split('\n')
array.pop()

const matrix = array.map(line => line.split(''))
const transposedMatrix = matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex])) // for matrix columns

// Part 1
let visibleTreeCount = 0
for (const [rowIndex, row] of matrix.entries()) {
  if (rowIndex === 0 || rowIndex === matrix.length - 1) { visibleTreeCount += row.length; continue } // first & last rows

  row.map((cell, cellIndex) => {
    if (cellIndex === 0 || cellIndex === row.length - 1) { visibleTreeCount += 1 } // left & right edges
    else {
      const visibleLeft = row.slice(0, cellIndex).every(x => x < cell) // every stops at 1st false instance
      const visibleRight = row.slice(cellIndex + 1, row.length).every(x => x < cell)
      const visibleUp = transposedMatrix[cellIndex].slice(0, rowIndex).every(x => x < cell)
      const visibleDown = transposedMatrix[cellIndex].slice(rowIndex + 1, row.length).every(x => x < cell)
      if (visibleRight || visibleLeft || visibleUp || visibleDown) visibleTreeCount += 1
    }
  })
}
console.log('part1Result: ', visibleTreeCount)

// Part 2
let scenicScores = cloneDeep(matrix)
for (const [rowIndex, row] of matrix.entries()) {
  if (rowIndex === 0 || rowIndex === matrix.length - 1) { row.map((_, cellIndex) => scenicScores[rowIndex][cellIndex] = 0 ); continue } // first & last rows

  row.map((cell, cellIndex) => {
    if (cellIndex === 0 || cellIndex === row.length - 1) { scenicScores[rowIndex][cellIndex] = 0 } // left & right edges
    else {
      let scoreLeft = 0, scoreRight = 0, scoreUp = 0, scoreDown = 0
      /* left  */ row.slice(0, cellIndex).reverse().every(x => { scoreLeft++; return x < cell })
      /* right */ row.slice(cellIndex + 1, row.length).every(x => { scoreRight++; return x < cell })
      /* up    */ transposedMatrix[cellIndex].slice(0, rowIndex).reverse().every(x => { scoreUp++; return x < cell })
      /* down  */ transposedMatrix[cellIndex].slice(rowIndex + 1, row.length).every(x => { scoreDown++; return x < cell })
      scenicScores[rowIndex][cellIndex] = scoreLeft * scoreRight * scoreUp * scoreDown
    }
  })
}

console.log('part2Result: ', Math.max(...scenicScores.map(row => Math.max(...row))))
