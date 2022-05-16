import './config'

import App from './app';

import middleWares from './middlewares';
import routers from './routers';

const port = process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT, 10) : 5000;
const baseUrl = process.env.BASE_URL || 'http://localhost:5000';

(async () => {
    try {
        // DB connection
    } catch (error) {
        console.error(error);
    }
    const app = new App({
        baseUrl,
        port,
        routers,
        middleWares,
    });

    app.listen();
})();
