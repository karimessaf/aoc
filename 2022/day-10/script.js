// https://adventofcode.com/2022/day/10

const fs = require('fs')
const chunk = require('lodash/chunk')

const file = fs.readFileSync(require.resolve('./input.txt'), 'utf8')
const array = file.split('\n')
array.pop()

// Common (calculate X by cycle)
let cycle = 1, X = 1, xByCycle = []
array.forEach(f => {
  if (f.split(' ')[0] === 'noop') {
    cycle += 1
    xByCycle.push({ cycle, X })
  }
  else {
    Array.from(Array(2)).forEach((_, i) => {
      cycle += 1
      if (i > 0) X += parseInt(f.split(' ')[1])
      xByCycle.push({ cycle, X })
    })
  }
})

// Part 1
let signalsSum = 0
const targetCycles = [20, 60, 100, 140, 180, 220]
targetCycles.forEach(cycle => {
  const signalStrength = xByCycle.find(xBC => xBC.cycle === cycle).X
  signalsSum += (cycle * signalStrength)
})
console.log('part1Result', signalsSum)

// Part 2
const drawing = []
xByCycle.unshift({ cycle: 1, X: 1 }) // initial state
Array.from(Array(6)).forEach(_ => { // rows
  for (const [CRTPosition, xBC] of xByCycle.splice(0, 40).entries()) // columns
    drawing.push([xBC.X, xBC.X + 1, xBC.X - 1].includes(CRTPosition) ? '#' : '.')
})
console.log(`part2Result \n${chunk(drawing, 40).map(a => a.join(' ')).join('\n')}`)
