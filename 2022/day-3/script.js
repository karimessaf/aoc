// https://adventofcode.com/2022/day/3/input
// utf-8 codes for alphabet: https://www.w3schools.com/charsets/ref_utf_basic_latin.asp

const fs = require('fs')
const sum = require('lodash/sum')
const chunk = require('lodash/chunk')
const intersection = require('lodash/intersection')

// Common
const file = fs.readFileSync(require.resolve('./input.txt'), 'utf-8')
const alphabet = Array.from(Array(52)).map((_, i) => i <= 25 ? i + 65 : i + 71).map(x => String.fromCharCode(x))
const orderedAlphabet = alphabet.slice(26).concat(alphabet.slice(0, 26)) // place lower case letters before upper case ones
const array = (file.split(/\r?\n/))
array.pop()

// Part 1
const compartment1 = [], compartment2 = []
array.forEach(x => {
  compartment1.push(x.slice(0, x.length / 2))
  compartment2.push(x.slice(x.length / 2))
})

const letters = []
Array.from(Array(array.length)).map((_, i) => letters.push(intersection([...compartment1[i]], [...compartment2[i]])))
const part1Result = sum(letters.map(x => orderedAlphabet.indexOf(...x) + 1))
console.log('part1Result', part1Result)

// Part 2
const groups = chunk(array, 3)
const letters2 = groups.map(x => intersection([...x[0]], [...x[1]], [...x[2]])).flat()
const part2Result = sum(letters2.map(x => orderedAlphabet.indexOf(...x) + 1))
console.log('part2Result', part2Result)


console.log('alphabet test', String.fromCharCode(...Array(123).keys()).slice(97))
