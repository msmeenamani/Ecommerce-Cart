import {  Request, Response } from 'express'
import ItemService from '../service/itemService'
import responseJson from '../utils/responseFormatter';

const itemService = new ItemService()
class ItemController {

  public createItem(req: Request, res: Response): any {
    const itemData = req.body;
    itemService.createItem(itemData, (err: any, response: object) => {
      if (err) {
        res.status(500).json(responseJson('err', err))
      } else {
        res.status(201).json(responseJson('suc', [response])) 
      }
    })
  }

  public getAllItems(req: Request, res: Response): any {
    itemService.getAllItems((err: any, response: object) => {
      if (err) {
        res.status(500).json(responseJson('err', err))
      } else {
        res.status(201).json(responseJson('suc', response)) 
      }
    })
  }

  public getItem(req: Request, res: Response): any {
    const itemId = req.params.id.toString();
    itemService.getItem(itemId, (err: any, response: object) => {
      if (err) {
        res.status(500).json(responseJson('err', err))
      } else {
        res.status(201).json(responseJson('suc', [response])) 
      }
    })
  }

  public updateItem(req: Request, res: Response): any {
    const itemId : string = req.params.id.toString();
    const itemData = req.body;
    itemService.updateItem(itemId, itemData, (err: any, response:object) => {
      if (err) {
        res.status(500).json(responseJson('err', err))
      } else {
        res.status(201).json(responseJson('suc', [response])) 
      }
    })
  }

  public deleteItem(req: Request, res: Response): any {
    const itemId : string = req.params.id.toString();
    itemService.deleteItem(itemId, (err: any, response:object) => {
      if (err) {
        res.status(500).json(responseJson('err', err))
      } else {
        res.status(201).json(responseJson('suc', [response])) 
      }
    })
  }

}

export default ItemController