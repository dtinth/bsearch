class WrapAsync
  def function
    "async function"
  end
  def predicate_type
    "PromiseLike<boolean>"
  end
  def return_type k
    "Promise<#{k}>"
  end
  def value k
    "await #{k}"
  end
  def name k
    "#{k}Async"
  end
  def return_doc
    'A promise that resolves to the'
  end
end

class WrapSync
  def function
    "function"
  end
  def predicate_type
    "boolean"
  end
  def return_type k
    k
  end
  def value k
    k
  end
  def name k
    k
  end
  def return_doc
    'The'
  end
end

def wrapper(async_flag)
  async_flag ? WrapAsync.new : WrapSync.new
end

def write_int(f, prefix, prefix_a, op, true_pos, async_flag)
  wrap = wrapper(async_flag)
  f << <<-EOF
/**
 * Returns the #{prefix} integer value in range [`min`, `max`] that is accepted by the `predicate`.
 * @param min - The minimum value to search for.
 * @param max - The maximum value to search for.
 * @param predicate - A predicate. There should exist some value `X` such that `predicate(x)` returns true for all `x #{op} X` and returns false otherwise.
 * @returns #{wrap.return_doc} #{prefix} integer value whose predicate returns `true`, or `undefined` if no such value exists.
 * @public
 */
export #{wrap.function} #{wrap.name prefix + 'Int'}(
  min: number,
  max: number,
  predicate: (value: number) => #{wrap.predicate_type},
): #{wrap.return_type 'number | undefined'} {
  let found: number | undefined
  while (min <= max) {
    const mid = Math.floor((min + max) / 2)
    if (#{wrap.value 'predicate(mid)'}) {
      found = mid
      #{true_pos == :right ? 'max = mid - 1' : 'min = mid + 1'}
    } else {
      #{true_pos == :right ? 'min = mid + 1' : 'max = mid - 1'}
    }
  }
  return found
}

/**
 * Returns the #{prefix_a} index in `array` whose value satisfies the `predicate`.
 * @param array - The array to search.
 * @param predicate - A predicate. There should exist some index `I` such that `predicate(array[i])` returns true for all `i #{op} I` and returns false otherwise.
 * @returns #{wrap.return_doc} #{prefix_a} index in `array` whose value satisfies the `predicate`, or `-1` if no such index exists.
 * @public
 */
export #{wrap.function} #{wrap.name prefix_a + 'Index'}<T>(
  array: readonly T[],
  predicate: (value: T, index: number, array: readonly T[]) => #{wrap.predicate_type},
): #{wrap.return_type 'number'} {
  const found = #{wrap.value wrap.name prefix + 'Int'}(0, array.length - 1, (index) =>
    predicate(array[index], index, array),
  )
  return found === undefined ? -1 : found
}

/**
 * Returns the #{prefix_a} element in `array` whose value satisfies the `predicate`.
 * @param array - The array to search.
 * @param predicate - A predicate. There should exist some index `I` such that `predicate(array[i])` returns true for all `i #{op} I` and returns false otherwise.
 * @returns #{wrap.return_doc} #{prefix_a} element in `array` whose value satisfies the `predicate`, or `undefined` if no such element exists.
 * @public
 */
export #{wrap.function} #{wrap.name prefix_a + 'Element'}<T>(
  array: readonly T[],
  predicate: (value: T, index: number, array: readonly T[]) => #{wrap.predicate_type},
): #{wrap.return_type 'T | undefined'} {
  const index = #{wrap.value wrap.name prefix_a + 'Index'}(array, predicate)
  return index === -1 ? undefined : array[index]
}

EOF
end

def write_float(f, prefix, op, true_pos, async_flag)
  wrap = wrapper(async_flag)
  f << <<-EOF
/**
 * Returns the #{prefix} floating-point value in range [`min`, `max`] that is accepted by the `predicate`.
 * @param min - The minimum value to search for.
 * @param max - The maximum value to search for.
 * @param predicate - A predicate. There should exist some value `X` such that `predicate(x)` returns true for all `x #{op} X` and returns false otherwise.
 * @param maxIterations - Maximum number of iterations to perform. It can be reduced to speed up the search for less precise values.
 * @returns #{wrap.return_doc} #{prefix} floating-point value whose predicate returns `true`, or `undefined` if no such value exists.
 * @public
 */
export #{wrap.function} #{wrap.name prefix + 'Float'}(
  min: number,
  max: number,
  predicate: (value: number) => #{wrap.predicate_type},
  maxIterations = 64,
): #{wrap.return_type 'number | undefined'} {
  let found: number | undefined
  for (let i = 0; i < maxIterations; i++) {
    const mid = (min + max) / 2
    if (#{wrap.value 'predicate(mid)'}) {
      found = mid
      #{true_pos == :right ? 'max = mid' : 'min = mid'}
    } else {
      #{true_pos == :right ? 'min = mid' : 'max = mid'}
    }
  }
  return found
}

EOF
end

File.open('src/index.ts', 'w') do |output|
  output << <<-EOF
/**
 * Utility functions for performing binary search in various scenarios.
 * @packageDocumentation
 */
EOF
  [false, true].each do |async_flag|
    write_int(output, 'smallest', 'first', '>=', :right, async_flag)
    write_int(output, 'largest', 'last', '<=', :left, async_flag)

    write_float(output, 'smallest', '>=', :right, async_flag)
    write_float(output, 'largest', '<=', :left, async_flag)
  end
end

system "npx prettier --write src/index.ts"