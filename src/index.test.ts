import * as bsearch from '.'

describe('firstIndex', () => {
  it('finds the first index satisfying the predicate', () => {
    const arr = [-10, -3, 0.05, 1, 28]
    const getInsertionIndex = (valueToInsert: number) => {
      const index = bsearch.firstIndex(arr, (value) => valueToInsert <= value)
      return index === -1 ? arr.length : index
    }
    expect(getInsertionIndex(-99)).toBe(0)
    expect(getInsertionIndex(-10)).toBe(0)
    expect(getInsertionIndex(-9)).toBe(1)
    expect(getInsertionIndex(0)).toBe(2)
    expect(getInsertionIndex(1)).toBe(3)
    expect(getInsertionIndex(4)).toBe(4)
    expect(getInsertionIndex(28)).toBe(4)
    expect(getInsertionIndex(28.01)).toBe(5)
  })
})

describe('lastElement', () => {
  it('finds the last element satisfying the predicate', () => {
    var book = [
      { page: 0, chapter: 'Front Cover' },
      { page: 2, chapter: 'Preamble' },
      { page: 5, chapter: 'Table of Contents' },
      { page: 8, chapter: 'Chapter 1' },
      { page: 29, chapter: 'Chapter 2' },
      { page: 48, chapter: 'Chapter 3' },
    ]
    const getCurrentChapter = (currentPage: number) => {
      return bsearch.lastElement(book, (b) => currentPage >= b.page)?.chapter
    }
    expect(getCurrentChapter(0)).toBe('Front Cover')
    expect(getCurrentChapter(1)).toBe('Front Cover')
    expect(getCurrentChapter(2)).toBe('Preamble')
    expect(getCurrentChapter(3)).toBe('Preamble')
    expect(getCurrentChapter(4)).toBe('Preamble')
    expect(getCurrentChapter(5)).toBe('Table of Contents')
    expect(getCurrentChapter(6)).toBe('Table of Contents')
    expect(getCurrentChapter(7)).toBe('Table of Contents')
    expect(getCurrentChapter(8)).toBe('Chapter 1')
    expect(getCurrentChapter(28)).toBe('Chapter 1')
    expect(getCurrentChapter(29)).toBe('Chapter 2')
    expect(getCurrentChapter(48)).toBe('Chapter 3')
    expect(getCurrentChapter(49)).toBe('Chapter 3')
    expect(getCurrentChapter(-1)).toBe(undefined)
  })
})

describe('largestFloatAsync', () => {
  it('finds the largest floating point number', async () => {
    const measureText = (fontSize: number, text: string) => {
      return text.length * fontSize
    }
    const idealFontSize = (text: string) => {
      return bsearch.largestFloatAsync(
        1,
        64,
        async (size) => measureText(size, text) <= 1280,
      )
    }
    expect(await idealFontSize('hi')).toBe(64)
    expect(
      await idealFontSize('there is just too much text to fit here!'),
    ).toBe(32)
    expect(
      await idealFontSize(
        'there is just too much text to fit here so it has to be scaled down',
      ),
    ).toBeCloseTo(19.104477611940297)
  })
})
