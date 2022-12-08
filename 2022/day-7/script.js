// https://adventofcode.com/2022/day/7

// Parse file
const fs = require('fs')
const file = fs.readFileSync(require.resolve('./input.txt'), 'utf-8')
const array = file.split('\n')
array.pop()

const tree = []

handleCommand = (line, index) => {
  const _line = line.split(' ')
  if (_line[0] !== '$' || _line[1] !== 'cd') return // ignore non cd commands
  tree.push({ node: _line[2], children: getChildren(line, index)})
  // if (_line[2] === '..')
  // console.log(_line)
}

getChildren = (line, index) => {
  const children = []
  for (let i = 1; i <= array.length; i++) {
    console.log(`(getChildren) i:${i}, array[index+i]: ${array[index+i]}, index+i:${index+i}, array:${array[index+i]}`)
    if (index + i === array.length) return
    if (array[index + i].split(' ')[1] === 'ls') continue; // skip ls
    if (array[index + i].split(' ')[1] === 'cd') handleCommand(array[index + i], index + i); // parent: cd, child: cd
    children.push(array[index + i])
  }
  return children
}


handleCommand(array[0], 0)
// array.forEach((line, index) => {
//   handleCommand(line, index)
// })

console.log('tree', tree)
