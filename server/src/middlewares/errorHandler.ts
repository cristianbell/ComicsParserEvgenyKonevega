import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): Response | void => {
    console.error(`[errorHandler] ${err.stack}`);

    return res.status(500).send(err.message);
};

export default errorHandler;
