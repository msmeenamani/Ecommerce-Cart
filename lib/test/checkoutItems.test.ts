import app from '../server' // Link to your server file
const supertest = require('supertest')
const request = supertest(app)
var postData = {
  "items": [
      {"itemId":"6052175c333947f5d6a4843a", "quantity": 1},
      {"itemId":"6051f7d190d6e0dc0e460c7c", "quantity": 2}
  ]
}

var itemArray = [
  { "name": "D", "price": 30 },
  { "name": "E", "price": 40 },
  { "name": "F", "price": 50 }
]

describe("Test e-commerce", () => {

  // it('post the item data', async done => {
  //   const res = await request.post('/ecom/item').send(postData)
  //   expect(res.body.statusCode).toBe(200)
  //   itemId = res.body.data[0]._id
  //   done()
  // })
  
  it('checkout item', async done => {
    const res = await request.get('/ecom/checkout')
    expect(res.body.statusCode).toBe(200)
    done()
  })

})