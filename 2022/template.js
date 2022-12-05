const fs = require('fs')

const file = fs.readFileSync(require.resolve('./input.txt'), 'utf-8')
const array = file.split('\n')
array.pop()
