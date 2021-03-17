import app from '../server' // Link to your server file
const supertest = require('supertest')
const request = supertest(app)
var postData = {
  "name": "D",
  "price": 30
}

var updateData = {
  "name": "D",
  "price": 40
}

var itemId = null;

describe("Test e-commerce", () => {

  it('post the item data', async done => {
    const res = await request.post('/ecom/item').send(postData)
    expect(res.body.statusCode).toBe(200)
    itemId = res.body.data[0]._id
    done()
  })

  it('Get all item', async done => {
    const res = await request.get('/ecom/item')
    expect(res.body.statusCode).toBe(200)
    done()
  })

  it('Get item by id', async done => {
    const res = await request.get('/ecom/item/'+itemId)
    expect(res.body.statusCode).toBe(200)
    done()
  })

  it('update item by id', async done => {
    const res = await request.put('/ecom/item/'+itemId).send(updateData)
    expect(res.body.statusCode).toBe(200)
    done()
  })

  it('delete item by id', async done => {
    const res = await request.delete('/ecom/item/'+itemId)
    expect(res.body.statusCode).toBe(200)
    done()
  })

})