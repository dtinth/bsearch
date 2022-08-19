# bsearch

**Utility functions for performing binary search in various scenarios** (sync/async, ints/arrays/floats).

## Available functions

| Use case       | Sync                                                           | Async                                                                              |
| -------------- | -------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Integers       | [smallestInt][smallestint]<br>[largestInt][largestint]         | [smallestIntAsync][smallestintasync]<br>[largestIntAsync][largestintasync]         |
| Floats         | [smallestFloat][smallestfloat]<br>[largestFloat][largestfloat] | [smallestFloatAsync][smallestfloatasync]<br>[largestFloatAsync][largestfloatasync] |
| Array indices  | [firstIndex][firstindex]<br>[lastIndex][lastindex]             | [firstIndexAsync][firstindexasync]<br>[lastIndexAsync][lastindexasync]             |
| Array elements | [firstElement][firstelement]<br>[lastElement][lastelement]     | [firstElementAsync][firstelementasync]<br>[lastElementAsync][lastelementasync]     |

[smallestint]: https://apiref.page/package/bsearch/smallestInt
[largestint]: https://apiref.page/package/bsearch/largestInt
[smallestintasync]: https://apiref.page/package/bsearch/smallestIntAsync
[largestintasync]: https://apiref.page/package/bsearch/largestIntAsync
[smallestfloat]: https://apiref.page/package/bsearch/smallestFloat
[largestfloat]: https://apiref.page/package/bsearch/largestFloat
[smallestfloatasync]: https://apiref.page/package/bsearch/smallestFloatAsync
[largestfloatasync]: https://apiref.page/package/bsearch/largestFloatAsync
[firstindex]: https://apiref.page/package/bsearch/firstIndex
[lastindex]: https://apiref.page/package/bsearch/lastIndex
[firstindexasync]: https://apiref.page/package/bsearch/firstIndexAsync
[lastindexasync]: https://apiref.page/package/bsearch/lastIndexAsync
[firstelement]: https://apiref.page/package/bsearch/firstElement
[lastelement]: https://apiref.page/package/bsearch/lastElement
[firstelementasync]: https://apiref.page/package/bsearch/firstElementAsync
[lastelementasync]: https://apiref.page/package/bsearch/lastElementAsync

## API reference

<https://apiref.page/package/bsearch>

[![API reference screenshot](https://ss.dt.in.th/api/screenshots/apiref-bsearch.png)](https://apiref.page/package/bsearch)

## Example: Looking up chapter from page number

Suppose you have an array of chapters in a book.

```js
const book = [
  { page: 0, chapter: 'Front Cover' },
  { page: 2, chapter: 'Preamble' },
  { page: 5, chapter: 'Table of Contents' },
  { page: 8, chapter: 'Chapter 1' },
  { page: 29, chapter: 'Chapter 2' },
  { page: 48, chapter: 'Chapter 3' },
]
```

To answer the question: **“What chapter am I on if I’m on page 20?”**

- Translate the question into “What is the last chapter I have started?”
- Define “I have started” as “I’m on or after the chapter’s first page.”

With that, the following code finds the answer:

```js
import * as bsearch from 'bsearch'
const chapter = bsearch.lastElement(book, (chapter) => 20 >= chapter.page)
```

## Example: Insertion index

Suppose you have an array of numbers.

```js
const numbers = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
```

You want to insert a new number `n` into the array while maintaining the sorted order. There are two ways:

- Finding the first possible insertion index:

  ```js
  const indexToInsertBefore = bsearch.firstIndex(numbers, (x) => n <= x)
  const insertionIndex =
    indexToInsertBefore === -1 ? numbers.length : indexToInsertBefore
  ```

- Finding the last possible insertion index:

  ```js
  const indexToInsertAfter = bsearch.lastIndex(numbers, (x) => n >= x)
  const insertionIndex = indexToInsertBefore + 1
  ```

## Example: Text fitting

Suppose you want to draw some text in a canvas. You want to find out what is the largest possible font size that will fit the text within a given width.

```js
const fontSize = bsearch.largestInt(1, 1000, (fontSize) => {
  ctx.font = `${fontSize}px sans-serif`
  return ctx.measureText(text).width <= availableWidth
})
```
