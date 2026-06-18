export function getSecureRandomInRange(min: number, max: number) {
  const range = max - min
  const array = new Uint32Array(1)
  crypto.getRandomValues(array)
  return min + (array[0]! % (range + 1))
}
