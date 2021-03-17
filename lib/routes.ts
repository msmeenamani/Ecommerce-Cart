import * as express from 'express'
// import ProductController from './controller/productController'
import ItemController from './controller/itemController'

class routes {
  // public productController: ProductController = new ProductController();
  public itemController: ItemController = new ItemController();

  public routes(app: express.Application) {
      
      app.route('/ecom/item').post(this.itemController.createItem)
      app.route('/ecom/item').get(this.itemController.getAllItems)
      app.route('/ecom/item/:id').get(this.itemController.getItem)
      app.route('/ecom/item/:id').put(this.itemController.updateItem)
      app.route('/ecom/item/:id').delete(this.itemController.deleteItem)
      
  }

}   

export default routes