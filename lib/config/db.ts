import * as mongoose from "mongoose"
import * as dotenv from 'dotenv'
dotenv.config()

const db: string = process.env.DATABASE_URL;

class ConnectDB {

  public async connect() {
    try {
      await mongoose.connect(db, {
          useNewUrlParser: true,
          useCreateIndex: true,
          useFindAndModify: false,
          useUnifiedTopology: true
      });

      console.log("MongoDB Connected...");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
  }

}

export default ConnectDB;