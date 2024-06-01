import cors from 'cors'
import express, {Application, Request,Response} from 'express';
import router from './app/routes';

const app:Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes

app.use('/api',router)

const entryRoute = (req:Request, res:Response)=>{
    const message = 'Sorry, this route does not exist. Please check the route name and try again.';
    res.send(message)
}

app.get('/', entryRoute)
export default app;