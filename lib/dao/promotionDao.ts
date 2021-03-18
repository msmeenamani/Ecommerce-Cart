import BaseDao from './baseDao'
import { PromotionModel } from '../model/promotionsModel'
const baseDao = new BaseDao();

class PromotionDao {

  public createPromotion(promotionData: object, callback: any): any {

    baseDao.createData(PromotionModel, promotionData, (err: any, res: object) => {
      if (err) {
        return callback(err, null)
      }
      callback(null, res)
    })
  }

  public getAllPromotion(callback: any): any {

    baseDao.getAllData(PromotionModel, (err: any, res: object) => {
      if (err) {
        return callback(err, null)
      }
      callback(null, res)
    })
  }

  public getPromotion(userId:string, callback: any): any {
    baseDao.getData(PromotionModel, userId, (err: any, res:object) => {
      if (err) {
        return callback(err, null)
      }
      callback(null, res)
    })
  }

  public async getPromotionByItem(userId:string, callback: any): Promise<any> {
    await PromotionModel.find({'itemId': userId}).exec().then((result) => {
      return callback(null, result)
    }).catch(e => callback(e, null))
  }

  public async getPromotionByName(name:string, callback: any): Promise<any> {
    await PromotionModel.find({'itemName': name}).exec().then((result) => {
      return callback(null, result)
    }).catch(e => callback(e, null))
  }

  public updatePromotion(itemId:string , itemData:any, callback: any): any {
    baseDao.updateData(PromotionModel, itemId, itemData, (err: any, res: object) => {
      if (err) {
        return callback(err, null)
      }
      callback(null, res)
    })
  }

  public deletePromotion(itemId:string , callback: any): any {
    baseDao.deleteData(PromotionModel, itemId, (err: any, res: object) => {
      if (err) {
        return callback(err, null)
      }
      callback(null, res)
    })
  }

}

export default PromotionDao