import app from '../server' // Link to your server file
const supertest = require('supertest')
const request = supertest(app)
var postData = {
  "itemName": "C",
    "discountType": "multiBuy",
    "discountDetails":{
        "multiples": 3,
        "discountPrice": 75
    }
}

var updateData = {
  "itemName": "VI",
    "discountType": "multiBuy",
    "discountDetails":{
        "multiples": 2,
        "discountPrice": 65
    }
}

var itemId = null;

describe("Test e-commerce", () => {

  it('post the promotion data', async done => {
    const res = await request.post('/ecom/promotion').send(postData)
    expect(res.body.statusCode).toBe(200)
    itemId = res.body.data[0]._id
    done()
  })

  it('Get all promotion', async done => {
    const res = await request.get('/ecom/promotion')
    expect(res.body.statusCode).toBe(200)
    done()
  })

  it('Get promotion by id', async done => {
    const res = await request.get('/ecom/promotion/'+itemId)
    expect(res.body.statusCode).toBe(200)
    done()
  })

  it('update promotion by id', async done => {
    const res = await request.put('/ecom/promotion/'+itemId).send(updateData)
    expect(res.body.statusCode).toBe(200)
    done()
  })

  it('delete promotion by id', async done => {
    const res = await request.delete('/ecom/promotion/'+itemId)
    expect(res.body.statusCode).toBe(200)
    done()
  })

})