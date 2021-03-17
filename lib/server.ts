import * as express from 'express'
import * as bodyParser from 'body-parser'
import Routes from './routes'
import ConnectDB from './config/db'

var PORT = "3001"
class App {

    public app: express.Application;
    public routesPrv : Routes = new Routes();
    public connectDB: ConnectDB = new ConnectDB();
  
    constructor(){
        this.app = express();
        this.config();
        this.routesPrv.routes(this.app)
        this.connectDB.connect()
    }

    private config(): void{
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

}

new App().app.listen(PORT, ()=>{
    console.log("app listening on port"+ PORT)
})

// export default new App().app;
