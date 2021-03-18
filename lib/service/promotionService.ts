import PromotionDao from '../dao/promotionDao'
const promotionDao = new PromotionDao();
import ItemDao from '../dao/itemDao'
const itemDao = new ItemDao();

class PromotionService {

  public createPromotion(promotionData: any, callback: any): any {

    let { itemName, discountType, discountDetails } = promotionData;
    if (!itemName || itemName.length < 0) {
      return callback('itemName must be required', null)
    } else if (!discountType || discountType == null) {
      return callback('discountType must be required', null)
    } else if (!discountDetails || discountDetails == null) {
      return callback('discountDetails must be required', null)
    }
    itemDao.getDataByName(itemName, (err: any, res: any) => {
      if (err) {
        return callback(err, null)
      } else {
        promotionData.itemId = res[0]?._id;
        promotionDao.createPromotion(promotionData, (err: any, res: object) => {
          if (err) {
            return callback(err, null)
          }
          callback(null, res)
        }) 
      }
    })
  }

  public getAllPromotion(callback: any): any {
    promotionDao.getAllPromotion((err: any, res: object) => {
      if (err) {
        return callback(err, null)
      }
      callback(null, res)
    })
  }

  public getPromotion(itemId: string, callback: any): any {
    if (!itemId || itemId == null) {
      return callback('id must be required', null)
    }
    promotionDao.getPromotion(itemId, (err: any, res: object) => {
      if (err) {
        return callback(err, null)
      }
      callback(null, res)
    })
  }

  public updatePromotion(itemId: string, itemData: any, callback: any): any {
    if (!itemId || itemId == null) {
      return callback('id must be required', null)
    }
    promotionDao.updatePromotion(itemId, itemData, (err: any, res: object) => {
      if (err) {
        return callback(err, null)
      }
      callback(null, res)
    })
  }

  public deletePromotion(itemId: string, callback: any): any {
    if (!itemId || itemId == null) {
      return callback('id must be required', null)
    }
    promotionDao.deletePromotion(itemId, (err: any, res: object) => {
      if (err) {
        return callback(err, null)
      }
      callback(null, {deleted: "successful"})
    })
  }

}

export default PromotionService