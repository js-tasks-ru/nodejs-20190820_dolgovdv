function sum(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('input type not Number');
  }
  return a + b;
}

module.exports = sum;
