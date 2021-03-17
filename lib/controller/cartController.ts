import {  Request, Response } from 'express'
import CartService from '../service/cartService'
import responseJson from '../utils/responseFormatter';

const cartService = new CartService()
class CartController {

  public updateCart(req: Request, res: Response): any {
    const cartData = req.body.items;
    cartService.updateCart(cartData, (err: any, response: object) => {
      if (err) {
        res.status(500).json(responseJson('err', err))
      } else {
        res.status(200).json(responseJson('suc', [response])) 
      }
    })
  }

  public clearCart(req: Request, res: Response): any {
    const cartId : string = req.params.id.toString();
    cartService.clearCart(cartId, (err: any, response:object) => {
      if (err) {
        res.status(500).json(responseJson('err', err))
      } else {
        res.status(200).json(responseJson('suc', [response])) 
      }
    })
  }

}

export default CartController