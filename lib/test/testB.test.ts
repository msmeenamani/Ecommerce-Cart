import app from '../server' // Link to your server file
const supertest = require('supertest')
const request = supertest(app)

var itemArray = [
  { "name": "A", "price": 30 },
  { "name": "B", "price": 20 },
  { "name": "C", "price": 50 }
]

var itemIds = [];

describe("Test e-commerce Test B", () => {

  it('post the item data', async done => {
    await request.post('/ecom/item').send(itemArray[0]).then(async e => {
      itemIds.push(e.body.data[0]._id)
      await request.post('/ecom/item').send(itemArray[1]).then(async item => {
        itemIds.push(item.body.data[0]._id)
        await request.post('/ecom/item').send(itemArray[2]).then(res => {
            itemIds.push(res.body.data[0]._id)
          expect(res.body.statusCode).toBe(200)
          done()
        })
      }) 
    }
    )
  })

  it('update cart', async done => {
    console.log("items --->", itemIds)
    const res = await request.put('/ecom/cart').send({
      "items": [
        {"itemId": itemIds[0], "quantity": 3},
        { "itemId": itemIds[1], "quantity": 2 },
      ]
    })
    expect(res.body.statusCode).toBe(200)
    done()
  })

  it('post the promotion data', async done => {
    const res = await request.post('/ecom/promotion').send({
      "itemName": "A",
      "discountType": "multiBuy",
      "discountDetails":{
          "multiples": 3,
          "discountPrice": 75
      }
    })
    expect(res.body.statusCode).toBe(200)
    done()
  })

  it('post the promotion data', async done => {
    const res = await request.post('/ecom/promotion').send({
      "itemName": "B",
      "discountType": "multiBuy",
      "discountDetails":{
          "multiples": 2,
          "discountPrice": 35
      }
    })
    expect(res.body.statusCode).toBe(200)
    done()
  })

  it('post the promotion data', async done => {
    const res = await request.post('/ecom/promotion').send({
      "itemName": "Total",
      "discountType": "basketTotal",
      "discountDetails":{
          "minOrderValue": 150,
          "discountPrice": 20
      }
    })
    expect(res.body.statusCode).toBe(200)
    done()
  })
  
  it('checkout item', async done => {
    const res = await request.get('/ecom/checkout')
    console.log("test --->", res.body.data)
    expect(res.body.statusCode).toBe(200)
    expect(res.body.data.total).toBe(110)
    done()
  })

})