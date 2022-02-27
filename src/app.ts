import express, { Application } from 'express';
import userRoutes from './routes/user.route';
import morgan from 'morgan';

const app: Application = express();


// settings
app.set('port', 3000);

// middlewares
app.use(morgan('dev'));
app.use(express.json());


// routes
app.use('/api/v1', userRoutes);


export default app;