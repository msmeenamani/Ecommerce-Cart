import app from '../server' // Link to your server file
const supertest = require('supertest')
const request = supertest(app)
var postData = {
  "items": [
      {"itemId":"6052175c333947f5d6a4843a", "quantity": 1},
      {"itemId":"6051f7d190d6e0dc0e460c7c", "quantity": 2}
  ]
}

describe("Test e-commerce", () => {

  it('update cart', async done => {
    const res = await request.put('/ecom/cart').send(postData)
    expect(res.body.statusCode).toBe(200)
    done()
  })

  it('delete item by id', async done => {
    const res = await request.delete('/ecom/cart')
    expect(res.body.statusCode).toBe(200)
    done()
  })

  it('clear cart', async done => {
    const res = await request.delete('/ecom/cart')
    expect(res.body.statusCode).toBe(200)
    done()
  })

})