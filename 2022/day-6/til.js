/*
  TIL:
  1) every acts as a forEach that can be broken with a falsy return statement ("return false" breaks the loop)
  2) some acts as a forEach that can be broken with a truthy return statement ("return true" breaks the loop)
  3) you can't "break;" a forEach loop (like a for loop)
*/

const array = [1, 2, 3, 4]

// stops at 3
for (let i = 0; i < array.length; i++) {
  const element = array[i];
  console.log(`(for) element ${element} (should stop at 3)`)
  if (element === 3) break;
}

array.every(element => {
  console.log(`(every) element ${element} (should stop at 3)`)
  return element <= 2 // 2 because at the console log is printed before the check is done
})

array.some(element => {
  console.log(`(some) element ${element} (should stop at 3)`)
  return element > 2
})

// Compilation error (ts): Jump target cannot cross function boundary
// Runtime error (js): SyntaxError: Illegal break statement
array.forEach(element => {
  console.log(`element ${element} (should stop at 3)`)
  if (element === 3) break;
})
