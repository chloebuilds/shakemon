const request = require('supertest')
const app = require('../app')

describe('GET pokemon', () => {
  test('Should return pokemon object', done => {
    request(app).get('/pokemon/6')
      .then(res => {
        expect(res.statusCode).toBe(200)
        done()
      })
  })
})