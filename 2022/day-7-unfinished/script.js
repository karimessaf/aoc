// https://adventofcode.com/2022/day/7

const fs = require('fs')
const groupBy = require('lodash/groupBy')
const uniq = require('lodash/uniq')
const sum = require('lodash/sum')

const file = fs.readFileSync(require.resolve('./sample.txt'), 'utf-8')
const array = file.split('\n')
array.pop()

let folders = []
/*
  folders format: [
    { name: '/', size: 0, parentIndex: -1, childrenIndexes: [0, 1] },
    { name: 'a', size: 0, parentIndex: 0, childrenIndexes: [2] }
    { name: 'b.txt', size: 123  parentIndex: 1 }
  ]
*/

createFolder = (parentIndex) => {
  for (let i = 1; i <= array.length - parentIndex + 1; i++) {
    if (i + parentIndex === array.length - 1) break // overflow
    const child = array[i + parentIndex + 1].split(' ')
    if (child[0] === '$') break // skip command
    folders.push({ name: child[1], size: child[0] === 'dir' ? 0 : child[0], parentIndex })
  }
}

array.map((line, i) => (line.split(' ')[1] === 'ls') && createFolder(i - 1)) // create folders when command is 'ls'
const parentIndexes = uniq(folders.map(f => f.parentIndex))

const folderSums = parentIndexes.forEach(index => folders.filter(f => f.parentIndex === index).map(f => f.size))

console.log('folderSums', folderSums)
// const groupedFolders = groupBy(folders, 'parentIndex')

// calculate size of folders with only files
// groupedFolders.forEach(f => console.log(f))

// console.log(groupedFolders)
// console.log(folders)

