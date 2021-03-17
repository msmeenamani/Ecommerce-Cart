import * as express from 'express'
import CartController from './controller/cartController'
import ItemController from './controller/itemController'

class routes {
  public cartController: CartController = new CartController();
  public itemController: ItemController = new ItemController();

  // constructor(public cartController: CartController){}

  public routes(app: express.Application) {
      
      app.route('/ecom/item').post(this.itemController.createItem)
      app.route('/ecom/item').get(this.itemController.getAllItems)
      app.route('/ecom/item/:id').get(this.itemController.getItem)
      app.route('/ecom/item/:id').put(this.itemController.updateItem)
      app.route('/ecom/item/:id').delete(this.itemController.deleteItem)

      app.route('/ecom/cart').put(this.cartController.updateCart)
      app.route('/ecom/cart/:id').delete(this.cartController.clearCart)
      
      
  }

}   

export default routes