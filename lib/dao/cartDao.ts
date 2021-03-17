import BaseDao from './baseDao'
import { CartModel } from '../model/cartModel'
const baseDao = new BaseDao();

class CartDao extends BaseDao {

  public createCart(itemData: object, callback: any): any {

    this.createData(CartModel, itemData, (err: any, res: object) => {
      if (err) {
        return callback(err, null)
      }
      callback(null, res)
    })
  }

  public async getAllCart(callback: any): Promise<any> {

    // baseDao.getAllData(CartModel, (err: any, res: object) => {
    //   if (err) {
    //     return callback(err, null)
    //   }
    //   callback(null, res)
    // })

    await CartModel.find().exec().then((result) => {
      return callback(null, result)
    }).catch(e => callback(e, null))
  }

  public getItem(userId:string, callback: any): any {
    this.getData(CartModel, userId, (err: any, res:object) => {
      if (err) {
        return callback(err, null)
      }
      callback(null, res)
    })
  }

  public updateCart(itemId:string , itemData:any, callback: any): any {
    this.updateData(CartModel, itemId, itemData, (err: any, res: object) => {
      if (err) {
        return callback(err, null)
      }
      callback(null, res)
    })
  }

}

export default CartDao