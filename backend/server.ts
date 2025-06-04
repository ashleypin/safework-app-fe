//express start
import express from 'express'
import cors from 'cors';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // vite dev server
  credentials: true
}));



//env config
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose'

mongoose.connect(process.env.DATABASE_URL||"UNDEFINED");
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to DB'));

//express server init

//import peopleRouter from './routes/peopleRouter';
import workplaceRouter from './routes/workplaceRouter';
import userRouter from './routes/userRouter';
import incidentRouter from './routes/incidentRouter';


app.use(express.json())

///
//app.use('/people', peopleRouter)
///

app.use('/workplaces', workplaceRouter)
app.use('/users', userRouter)
app.use('/incidents', incidentRouter)



//Sample URL: localhost3000/people

app.listen(3000, ()=>console.log("Server running"));


