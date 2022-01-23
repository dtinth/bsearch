/**
 * Returns the first integer value in range [`min`, `max`] that is accepted by the `predicate`.
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
      found = mid
      min = mid + 1
    } else {
      max = mid - 1
    }
  }
  return found
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

/**
 * Returns the smallest floating-point value in range [`min`, `max`] that is accepted by the `predicate`.
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
 * Returns the largest floating-point value in range [`min`, `max`] that is accepted by the `predicate`.
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
      found = mid
      min = mid
    } else {
      max = mid
    }
  }
  return found
}

/**
 * Returns the first integer value in range [`min`, `max`] that is accepted by the `predicate`.
 * @param min - The minimum value to search for.
 * @param max - The maximum value to search for.
 * @param predicate - A predicate. There should exist some value `X` such that `predicate(x)` returns true for all `x >= X` and returns false otherwise.
 * @returns A promise that resolves to the first integer value whose predicate returns `true`, or `undefined` if no such value exists.
 * @public
 */
export async function firstIntAsync(
  min: number,
  max: number,
  predicate: (value: number) => PromiseLike<boolean>,
): Promise<number | undefined> {
  let found: number | undefined
  while (min <= max) {
    const mid = Math.floor((min + max) / 2)
    if (await predicate(mid)) {
      found = mid
      max = mid - 1
    } else {
      min = mid + 1
    }
  }
  return found
}

/**
 * Returns the first index in `array` whose value satisfies the `predicate`.
 * @param array - The array to search.
 * @param predicate - A predicate. There should exist some index `I` such that `predicate(array[i])` returns true for all `i >= I` and returns false otherwise.
 * @returns A promise that resolves to the first index in `array` whose value satisfies the `predicate`, or `-1` if no such index exists.
 * @public
 */
export async function firstIndexAsync<T>(
  array: readonly T[],
  predicate: (
    value: T,
    index: number,
    array: readonly T[],
  ) => PromiseLike<boolean>,
): Promise<number> {
  const found = await firstIntAsync(0, array.length - 1, (index) =>
    predicate(array[index], index, array),
  )
  return found === undefined ? -1 : found
}

/**
 * Returns the first element in `array` whose value satisfies the `predicate`.
 * @param array - The array to search.
 * @param predicate - A predicate. There should exist some index `I` such that `predicate(array[i])` returns true for all `i >= I` and returns false otherwise.
 * @returns A promise that resolves to the first element in `array` whose value satisfies the `predicate`, or `undefined` if no such element exists.
 * @public
 */
export async function firstElementAsync<T>(
  array: readonly T[],
  predicate: (
    value: T,
    index: number,
    array: readonly T[],
  ) => PromiseLike<boolean>,
): Promise<T | undefined> {
  const index = await firstIndexAsync(array, predicate)
  return index === -1 ? undefined : array[index]
}

/**
 * Returns the last integer value in range [`min`, `max`] that is accepted by the `predicate`.
 * @param min - The minimum value to search for.
 * @param max - The maximum value to search for.
 * @param predicate - A predicate. There should exist some value `X` such that `predicate(x)` returns true for all `x <= X` and returns false otherwise.
 * @returns A promise that resolves to the last integer value whose predicate returns `true`, or `undefined` if no such value exists.
 * @public
 */
export async function lastIntAsync(
  min: number,
  max: number,
  predicate: (value: number) => PromiseLike<boolean>,
): Promise<number | undefined> {
  let found: number | undefined
  while (min <= max) {
    const mid = Math.floor((min + max) / 2)
    if (await predicate(mid)) {
      found = mid
      min = mid + 1
    } else {
      max = mid - 1
    }
  }
  return found
}

/**
 * Returns the last index in `array` whose value satisfies the `predicate`.
 * @param array - The array to search.
 * @param predicate - A predicate. There should exist some index `I` such that `predicate(array[i])` returns true for all `i <= I` and returns false otherwise.
 * @returns A promise that resolves to the last index in `array` whose value satisfies the `predicate`, or `-1` if no such index exists.
 * @public
 */
export async function lastIndexAsync<T>(
  array: readonly T[],
  predicate: (
    value: T,
    index: number,
    array: readonly T[],
  ) => PromiseLike<boolean>,
): Promise<number> {
  const found = await lastIntAsync(0, array.length - 1, (index) =>
    predicate(array[index], index, array),
  )
  return found === undefined ? -1 : found
}

/**
 * Returns the last element in `array` whose value satisfies the `predicate`.
 * @param array - The array to search.
 * @param predicate - A predicate. There should exist some index `I` such that `predicate(array[i])` returns true for all `i <= I` and returns false otherwise.
 * @returns A promise that resolves to the last element in `array` whose value satisfies the `predicate`, or `undefined` if no such element exists.
 * @public
 */
export async function lastElementAsync<T>(
  array: readonly T[],
  predicate: (
    value: T,
    index: number,
    array: readonly T[],
  ) => PromiseLike<boolean>,
): Promise<T | undefined> {
  const index = await lastIndexAsync(array, predicate)
  return index === -1 ? undefined : array[index]
}

/**
 * Returns the smallest floating-point value in range [`min`, `max`] that is accepted by the `predicate`.
 * @param min - The minimum value to search for.
 * @param max - The maximum value to search for.
 * @param predicate - A predicate. There should exist some value `X` such that `predicate(x)` returns true for all `x >= X` and returns false otherwise.
 * @param maxIterations - Maximum number of iterations to perform. It can be reduced to speed up the search for less precise values.
 * @returns A promise that resolves to the smallest floating-point value whose predicate returns `true`, or `undefined` if no such value exists.
 * @public
 */
export async function smallestFloatAsync(
  min: number,
  max: number,
  predicate: (value: number) => PromiseLike<boolean>,
  maxIterations = 64,
): Promise<number | undefined> {
  let found: number | undefined
  for (let i = 0; i < maxIterations; i++) {
    const mid = (min + max) / 2
    if (await predicate(mid)) {
      found = mid
      max = mid
    } else {
      min = mid
    }
  }
  return found
}

/**
 * Returns the largest floating-point value in range [`min`, `max`] that is accepted by the `predicate`.
 * @param min - The minimum value to search for.
 * @param max - The maximum value to search for.
 * @param predicate - A predicate. There should exist some value `X` such that `predicate(x)` returns true for all `x <= X` and returns false otherwise.
 * @param maxIterations - Maximum number of iterations to perform. It can be reduced to speed up the search for less precise values.
 * @returns A promise that resolves to the largest floating-point value whose predicate returns `true`, or `undefined` if no such value exists.
 * @public
 */
export async function largestFloatAsync(
  min: number,
  max: number,
  predicate: (value: number) => PromiseLike<boolean>,
  maxIterations = 64,
): Promise<number | undefined> {
  let found: number | undefined
  for (let i = 0; i < maxIterations; i++) {
    const mid = (min + max) / 2
    if (await predicate(mid)) {
      found = mid
      min = mid
    } else {
      max = mid
    }
  }
  return found
}
