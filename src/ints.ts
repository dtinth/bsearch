/**
 * Returns the first integer value in range [`min`, `max`] is accepted by the `predicate`.
 * @param min - The minimum value to search for.
 * @param max - The maximum value to search for.
 * @param predicate - A predicate. There should exist some value `X` such that `predicate(x)` returns true for all `x >= X` and returns false otherwise.
 * @returns The first integer value whose predicate returns `true`, or `undefined` if no such value exists.
 * @public
 */
export function firstInt(
  min: number,
  max: number,
  predicate: (value: number) => boolean,
): number | undefined {
  let found: number | undefined
  while (min <= max) {
    const mid = Math.floor((min + max) / 2)
    if (predicate(mid)) {
      found = mid
      max = mid - 1
    } else {
      min = mid + 1
    }
  }
  return found
}

/**
 * Returns the last integer value in range [`min`, `max`] that is accepted by the `predicate`.
 * @param min - The minimum value to search for.
 * @param max - The maximum value to search for.
 * @param predicate - A predicate. There should exist some value `X` such that `predicate(x)` returns true for all `x <= X` and returns false otherwise.
 * @returns The last integer value whose predicate returns `true`, or `undefined` if no such value exists.
 * @public
 */
export function lastInt(
  min: number,
  max: number,
  predicate: (value: number) => boolean,
): number | undefined {
  let found: number | undefined
  while (min <= max) {
    const mid = Math.floor((min + max) / 2)
    if (predicate(mid)) {
      min = mid + 1
      found = mid
    } else {
      max = mid - 1
    }
  }
  return found
}
