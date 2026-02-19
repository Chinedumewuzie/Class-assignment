// Multiply any number of arguments
function multiplyAll(...args) {
  if (args.length === 0) return 0;

  return args.reduce((acc, curr) => acc * curr, 1);
}

// Example usage
console.log(multiplyAll(2, 3, 4)); // 24
console.log(multiplyAll(5, 10));   // 50
