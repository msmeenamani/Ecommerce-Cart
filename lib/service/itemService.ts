import ItemDao from '../dao/itemDao'
const itemDao = new ItemDao();

class ItemService {

  public createItem(itemData: any, callback: any): any {

    let { name, price } = itemData;
    if (!name || name.length < 0) {
      return callback('name must be required', null)
    } else if (!price || price == null) {
      return callback('price must be required', null)
    }

    itemDao.createItem(itemData, (err: any, res: object) => {
      if (err) {
        return callback(err, null)
      }
      callback(null, res)
    })
  }

  public getAllItems(callback: any): any {
    itemDao.getAllItems((err: any, res: object) => {
      if (err) {
        return callback(err, null)
      }
      callback(null, res)
    })
  }

  public getItem(itemId: string, callback: any): any {
    if (!itemId || itemId == null) {
      return callback('id must be required', null)
    }
    itemDao.getItem(itemId, (err: any, res: object) => {
      if (err) {
        return callback(err, null)
      }
      callback(null, res)
    })
  }

  public updateItem(itemId: string, itemData: any, callback: any): any {
    if (!itemId || itemId == null) {
      return callback('id must be required', null)
    }
    itemDao.updateItem(itemId, itemData, (err: any, res: object) => {
      if (err) {
        return callback(err, null)
      }
      callback(null, res)
    })
  }

  public deleteItem(itemId: string, callback: any): any {
    if (!itemId || itemId == null) {
      return callback('id must be required', null)
    }
    let itemData = {
      deleted: true
    }
    itemDao.updateItem(itemId, itemData, (err: any, res: object) => {
      if (err) {
        return callback(err, null)
      }
      callback(null, res)
    })
  }


}

export default ItemService