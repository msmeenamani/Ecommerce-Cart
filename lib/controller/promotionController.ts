import {  Request, Response } from 'express'
import PromotionService from '../service/promotionService'
import responseJson from '../utils/responseFormatter';

const promotionService = new PromotionService()
class PromotionController {

  public createPromotion(req: Request, res: Response): any {
    const promotionData = req.body;
    promotionService.createPromotion(promotionData, (err: any, response: object) => {
      if (err) {
        res.status(500).json(responseJson('err', err))
      } else {
        res.status(200).json(responseJson('suc', [response])) 
      }
    })
  }

  public getAllPromotion(req: Request, res: Response): any {
    promotionService.getAllPromotion((err: any, response: object) => {
      if (err) {
        res.status(500).json(responseJson('err', err))
      } else {
        res.status(200).json(responseJson('suc', response)) 
      }
    })
  }

  public getPromotion(req: Request, res: Response): any {
    const itemId = req.params.id.toString();
    promotionService.getPromotion(itemId, (err: any, response: object) => {
      if (err) {
        res.status(500).json(responseJson('err', err))
      } else {
        res.status(200).json(responseJson('suc', [response])) 
      }
    })
  }

  public updatePromotion(req: Request, res: Response): any {
    const itemId : string = req.params.id.toString();
    const itemData = req.body;
    promotionService.updatePromotion(itemId, itemData, (err: any, response:object) => {
      if (err) {
        res.status(500).json(responseJson('err', err))
      } else {
        res.status(200).json(responseJson('suc', [response])) 
      }
    })
  }

  public deletePromotion(req: Request, res: Response): any {
    const itemId : string = req.params.id.toString();
    promotionService.deletePromotion(itemId, (err: any, response:object) => {
      if (err) {
        res.status(500).json(responseJson('err', err))
      } else {
        res.status(200).json(responseJson('suc', [response])) 
      }
    })
  }

  public getTotal(req: Request, res: Response): any {
    const itemId : string = req.params.id.toString();
    promotionService.getTotal(itemId, (err: any, response:object) => {
      if (err) {
        res.status(500).json(responseJson('err', err))
      } else {
        res.status(200).json(responseJson('suc', [response])) 
      }
    })
  }

}

export default PromotionController