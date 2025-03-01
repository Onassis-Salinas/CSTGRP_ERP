export function parseNumber(input) {
  const trimmedInput = input.trim();

  const numberRegex = /^-?(\d{1,3})(,\d{3})*(\.\d+)?$/;

  if (numberRegex.test(trimmedInput)) {
    return parseFloat(input);
  } else {
    return NaN;
  }
}
