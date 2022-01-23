import { firstInt, lastInt } from './ints'

/**
 * Returns the first index in `array` whose value satisfies the `predicate`.
 * @param array - The array to search.
 * @param predicate - A predicate. There should exist some index `I` such that `predicate(array[i])` returns true for all `i >= I` and returns false otherwise.
 * @returns The first index in `array` whose value satisfies the `predicate`, or `-1` if no such index exists.
 * @public
 */
export function firstIndex<T>(
  array: readonly T[],
  predicate: (value: T, index: number, array: readonly T[]) => boolean,
): number {
  const found = firstInt(0, array.length - 1, (index) =>
    predicate(array[index], index, array),
  )
  return found === undefined ? -1 : found
}

/**
 * Returns the first element in `array` whose value satisfies the `predicate`.
 * @param array - The array to search.
 * @param predicate - A predicate. There should exist some index `I` such that `predicate(array[i])` returns true for all `i >= I` and returns false otherwise.
 * @returns The first element in `array` whose value satisfies the `predicate`, or `undefined` if no such element exists.
 * @public
 */
export function firstElement<T>(
  array: readonly T[],
  predicate: (value: T, index: number, array: readonly T[]) => boolean,
): T | undefined {
  const index = firstIndex(array, predicate)
  return index === -1 ? undefined : array[index]
}

/**
 * Returns the last index in `array` whose value satisfies the `predicate`.
 * @param array - The array to search.
 * @param predicate - A predicate. There should exist some index `I` such that `predicate(array[i])` returns true for all `i <= I` and returns false otherwise.
 * @returns The last index in `array` whose value satisfies the `predicate`, or `-1` if no such index exists.
 * @public
 */
export function lastIndex<T>(
  array: readonly T[],
  predicate: (value: T, index: number, array: readonly T[]) => boolean,
): number {
  const found = lastInt(0, array.length - 1, (index) =>
    predicate(array[index], index, array),
  )
  return found === undefined ? -1 : found
}

/**
 * Returns the last element in `array` whose value satisfies the `predicate`.
 * @param array - The array to search.
 * @param predicate - A predicate. There should exist some index `I` such that `predicate(array[i])` returns true for all `i <= I` and returns false otherwise.
 * @returns The last element in `array` whose value satisfies the `predicate`, or `undefined` if no such element exists.
 * @public
 */
export function lastElement<T>(
  array: readonly T[],
  predicate: (value: T, index: number, array: readonly T[]) => boolean,
): T | undefined {
  const index = lastIndex(array, predicate)
  return index === -1 ? undefined : array[index]
}
