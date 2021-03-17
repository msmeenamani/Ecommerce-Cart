import CartDao from '../dao/cartDao'
import ItemDao from '../dao/itemDao';
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
                price: res.price,
                total: e.quantity * res.price
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

}

export default cartService