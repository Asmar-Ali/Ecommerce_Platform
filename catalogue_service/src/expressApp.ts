import express, { NextFunction , Request, Response } from 'express'
import catalogRoutes from './api/catalog.routes';

const app = express();


app.get("/", (req : Request, res : Response, next : NextFunction) => {  
    res.json(200).send({
        message : 'Hello World'
    });
});


app.use("/", catalogRoutes);


export default app;