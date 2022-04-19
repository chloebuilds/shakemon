const { respEN } = require('../index.js')

describe('respEN', () => {
  test('Should return pokemon description', () => {
    expect(respEN.toBe("When several of\nthese POKéMON\ngather, their\felectricity could\nbuild and cause\nlightning storms."))
  })
})