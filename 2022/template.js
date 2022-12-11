const fs = require('fs')

const file = fs.readFileSync(require.resolve('./sample.txt'), 'utf8')
const array = file.split('\n')
array.pop()

console.log(array)
