import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as path from "path";
import errorHandler from "./middlewares/errorHandler";

const cors = require('cors')

export interface AppInitOptions {
    baseUrl: string;
    port: number;
    middleWares: any;
    routers: any;
}

class App {
    public app: express.Application;

    public baseUrl: string;

    public port: number;

    constructor(appInit: AppInitOptions) {
        this.app = express();
        this.baseUrl = appInit.baseUrl;
        this.port = appInit.port;

        this.app.use('/', express.static('./public'));
        this.app.use(cookieParser());
        this.app.use(cors())

        this.middlewares(appInit.middleWares);
        this.routes(appInit.routers);
        this.app.use('*', (_, res) => {
            res.setHeader('Content-Type', 'text/html');
            res.sendFile(path.resolve('./public/index.html'));
        });
        this.app.use(errorHandler);

    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log(`App listening on the ${this.baseUrl}`)
        });
    }

    private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void }): void {
        middleWares.forEach((middleWare) => {
            this.app.use(middleWare);
        });
    }

    private routes(routers: { forEach: (arg0: (routers: any) => void) => void }): void {
        routers.forEach((Router) => {
            const { path: pathname, router } = new Router();
            this.app.use(`/${pathname}`, router);
        });
    }
}

export default App;
