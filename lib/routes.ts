import * as express from 'express'
import CartController from './controller/cartController'
import ItemController from './controller/itemController'
import PromotionController from './controller/promotionController'

class routes {
  public cartController: CartController = new CartController();
  public itemController: ItemController = new ItemController();
  public promotionController: PromotionController = new PromotionController();

  // constructor(public cartController: CartController){}

  public routes(app: express.Application) {
      
      app.route('/ecom/item').post(this.itemController.createItem)
      app.route('/ecom/item').get(this.itemController.getAllItems)
      app.route('/ecom/item/:id').get(this.itemController.getItem)
      app.route('/ecom/item/:id').put(this.itemController.updateItem)
      app.route('/ecom/item/:id').delete(this.itemController.deleteItem)

      app.route('/ecom/cart').put(this.cartController.updateCart)
      app.route('/ecom/cart/:id').delete(this.cartController.clearCart)
      app.route('/ecom/checkout').get(this.cartController.getTotal)

      app.route('/ecom/promotion').post(this.promotionController.createPromotion)
      app.route('/ecom/promotion').get(this.promotionController.getAllPromotion)
      app.route('/ecom/promotion/:id').get(this.promotionController.getPromotion)
      app.route('/ecom/promotion/:id').put(this.promotionController.updatePromotion)
      app.route('/ecom/promotion/:id').delete(this.promotionController.deletePromotion)
      
  }

}   

export default routes