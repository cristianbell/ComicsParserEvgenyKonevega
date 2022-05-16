import { NextFunction, Request, Response, Router } from 'express';

import { FeedController } from '../controllers';

class FeedRouter {
    public readonly path: string;

    public readonly router: Router;

    protected controller: FeedController;

    constructor() {
        this.path = 'feed';
        this.controller = new FeedController();
        this.router = Router();

        this.router.get('/', this.getAll);
    }

    private getAll = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const data = await this.controller.getFeed()
            res.send(data)
        } catch (error) {
            return next(error);
        }
    };

}

export default FeedRouter;
