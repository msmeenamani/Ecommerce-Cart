import BaseDao from './baseDao'
import { ItemModel } from '../model/itemModel'
const baseDao = new BaseDao();

class ItemDao extends BaseDao {

  public createItem(itemData: object, callback: any): any {

    this.createData(ItemModel, itemData, (err: any, res: object) => {
      if (err) {
        return callback(err, null)
      }
      callback(null, res)
    })
  }

  public getAllItems(callback: any): any {

    this.getAllData(ItemModel, (err: any, res: object) => {
      if (err) {
        return callback(err, null)
      }
      callback(null, res)
    })
  }

  public getItem(userId:string, callback: any): any {
    this.getData(ItemModel, userId, (err: any, res:object) => {
      if (err) {
        return callback(err, null)
      }
      callback(null, res)
    })
  }

  public updateItem(itemId:string , itemData:any, callback: any): any {
    this.updateData(ItemModel, itemId, itemData, (err: any, res: object) => {
      if (err) {
        return callback(err, null)
      }
      callback(null, res)
    })
  }

}

export default ItemDao