const request = require('supertest')
const app = require('../index')

describe('GET pokemon', () => {
  test('Should return pokemon description', done => {
    request(app).get('/pokemon/6')
      .then(res => {
        expect(res.statusCode).toBe(200)
        done()
      })
  })
})