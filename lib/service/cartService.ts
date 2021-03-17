import CartDao from '../dao/cartDao'
import ItemDao from '../dao/itemDao';
import PromotionDao from '../dao/promotionDao'
const promotionDao = new PromotionDao();
import * as async from 'async';

const cartDao = new CartDao();
const itemDao = new ItemDao()

class cartService {

  public updateCart(cartData: any, callback: any): any {

    let cartItems = []
    if (cartData && cartData.length > 0) {
      async.forEachOf(cartData, (e) => {
        cartItems.push(new Promise((resolve, reject) => {
          if (e.itemId) {
            itemDao.getItem(e.itemId, (err: any, res: any | null) => {
              if (err) {
                return callback(err, null)
              }
              let individualItem = {
                itemId: res._id,
                quantity: e.quantity,
                price: res.price
              }
              resolve(individualItem)
            })
          } 
        }))
      })
    }

    Promise.all(cartItems).then(value => {
      this.getAllCart((err: any, res: any) => {
        if (!res[0]) {
          this.createCart({ "items": value }, (err, res) => {
            if (err) return callback(err, null)
            callback(null, res)
          })
        } else {
          cartDao.updateCart(res[0]._id, { "items": value }, (err: any, res: object) => {
            if (err) {
              return callback(err, null)
            }
            callback(null, res)
          })
        }
      })
    }).catch(err => {
      console.log("catch --->", err)
    })
  }

  public getAllCart(callback: any): any {
    cartDao.getAllCart((err: any, res: object) => {
      if (err) {
        return callback(err, null)
      }
      callback(null, res)
    })
  }

  public createCart(cartData: object , callback: any): any {
    cartDao.createCart(cartData, (err: any, res: object) => {
      if (err) {
        return callback(err, null)
      }
      callback(null, res)
    })
  }

  public clearCart(itemId: string, callback: any): any {
    if (!itemId || itemId == null) {
      return callback('id must be required', null)
    }
    cartDao.updateCart(itemId, { "items": [] }, (err: any, res: object) => {
      if (err) {
        return callback(err, null)
      }
      callback(null, res)
    })
  }

  public getTotal(callback: any): any {
    cartDao.getAllCart((err: any, res: object) => {
      if (err) {
        return callback(err, null)
      }

      let itemsArr = res[0].items;
      if (itemsArr.length > 0) {
        let finalArr = []
        async.forEachOf(itemsArr, (item) => {
          finalArr.push(new Promise((resolve, reject) => {
            if (item.itemId) {
              itemDao.getItem(item.itemId, (error: any, resp: any) => {
                if(error) return callback(error, null)
                promotionDao.getPromotionByItem(item.itemId, (err: any, response: any) => {
                  if (err) return callback(err, null)
                  let finalData = item;
                  if (response.length > 0) {
                    finalData = this.applyDiscount(1, item, resp, response[0])
                  }else{
                    finalData = this.applyDiscount(1, item, resp, null)
                  }
                  resolve(finalData)
                })
              })
            }
          }))
        })

        Promise.all(finalArr).then(val => {
          if (val.length > 0) {
            let data = {
              subTotal : 0,
              total : 0,
              discount : 0 
            }
            val.map(e => {
              data.subTotal = data.subTotal + e.subTotal
              data.total = data.total + e.total
              data.discount = data.discount + e.discount
            })
            let finalData = data
            promotionDao.getPromotionByName("basketTotal", (err: any, response: any) => {
              if (err) return callback(err, null)
              if (response.length > 0) {
                finalData = this.applyTotalDiscount(2, data, response[0])
              }
              callback(null, { "total": finalData.total, "subTotal": finalData.subTotal, "discount": finalData.discount, "items": val });
            })
          }
        })
      }
    })
  }

  private applyDiscount(identifier:Number, item: any, fullItem: any, promotion: any ) {
    if (identifier == 1) {
      let data: any = {};
      let { name } = fullItem
      let { quantity, price, itemId} = item;
      let q = 0, r = 0, subTot = 0, tot = 0;

      if (promotion) {
        let { discountType, discountDetails } = promotion;
        let { multiples, discountPrice } = discountDetails;
        q = Math.round(quantity/multiples);
        r = quantity%multiples;
        tot = (q * discountPrice) + (r * price)
        subTot = quantity * price
        data.discountType = discountType
      } else {
        subTot = quantity * price
        tot = quantity * price
      }

      data.name = name
      data.subTotal = subTot
      data.total = tot
      data.discount = subTot - tot
      data.itemId = itemId;
      data.quantity = quantity;
      data.price = price
      return data
    }
  }

  private applyTotalDiscount(identifier: Number, data: any, promotion: any) {
    let { total, subTotal, discount } = data;
    if (identifier == 2) {
      let { discountDetails } = promotion;
      let { minOrderValue, discountPrice } = discountDetails;
      if (total > minOrderValue) {
        total = total - discountPrice;
      }

    }
    return data
  }

}

export default cartService