/**
 * Returns the smallest floating-point value in range [`min`, `max`] is accepted by the `predicate`.
 * @param min - The minimum value to search for.
 * @param max - The maximum value to search for.
 * @param predicate - A predicate. There should exist some value `X` such that `predicate(x)` returns true for all `x >= X` and returns false otherwise.
 * @param maxIterations - Maximum number of iterations to perform. It can be reduced to speed up the search for less precise values.
 * @returns The smallest floating-point value whose predicate returns `true`, or `undefined` if no such value exists.
 * @public
 */
export function smallestFloat(
  min: number,
  max: number,
  predicate: (value: number) => boolean,
  maxIterations = 64,
): number | undefined {
  let found: number | undefined
  for (let i = 0; i < maxIterations; i++) {
    const mid = (min + max) / 2
    if (predicate(mid)) {
      found = mid
      max = mid
    } else {
      min = mid
    }
  }
  return found
}

/**
 * Returns the largest floating-point value in range [`min`, `max`] is accepted by the `predicate`.
 * @param min - The minimum value to search for.
 * @param max - The maximum value to search for.
 * @param predicate - A predicate. There should exist some value `X` such that `predicate(x)` returns true for all `x <= X` and returns false otherwise.
 * @param maxIterations - Maximum number of iterations to perform. It can be reduced to speed up the search for less precise values.
 * @returns The largest floating-point value whose predicate returns `true`, or `undefined` if no such value exists.
 * @public
 */
export function largestFloat(
  min: number,
  max: number,
  predicate: (value: number) => boolean,
  maxIterations = 64,
): number | undefined {
  let found: number | undefined
  for (let i = 0; i < maxIterations; i++) {
    const mid = (min + max) / 2
    if (predicate(mid)) {
      min = mid
      found = mid
    } else {
      max = mid
    }
  }
  return found
}
