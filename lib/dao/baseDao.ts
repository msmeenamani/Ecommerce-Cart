// import { UserModel } from '../model/product'

class BaseDao {

  public userData: object;

  public async createData(model, data, callback): Promise<any> {
    
    let finalData = new model(data);
    await finalData.save().then((result) => {
        return callback(null, result);
    }).catch((error) => {
        callback(error, null);
    })
  }

  public async getAllData(model, callback): Promise<any> {
    await model.find({deleted: false}).exec().then((result) => {
      return callback(null, result)
    }).catch(e => callback(e, null))
  } 

  public async getData(model, id, callback): Promise<any> {
    await model.findById(id).exec().then((result) => {
      return callback(null, result)
    }).catch(e => callback(e, null))
  }

  public async updateData(model, id, updatedData, callback): Promise<any> {
    await model.findByIdAndUpdate(id, updatedData).exec();
    await model.findById(id).exec().then((result) => {
      return callback(null, result)
    }).catch(e => callback(e, null))
  }

  public async deleteUser(model, id, callback): Promise<any> {
    await model.findByIdAndRemove(id).exec();
    callback({"data": "deleted successful"})
  }

  
}

export default BaseDao