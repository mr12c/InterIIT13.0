import express from  'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from 'path'
import { fileURLToPath } from 'url';
import { errorHandler } from './middlewares/error.middleware.js';
 
const app = express()


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, './Public')));

app.use(cors(
    {orgin:process.env.CORS_ORGIN,
    Credential:true
    }
))   
app.use(cookieParser())
app.use(express.json({limit:"16kb"}))//// for getting the form data 
app.use(express.urlencoded({extended:true,limit:"16kb"}))  //// /for getting data from urlencoded extended is using for reading data from  nested objects also
app.use(express.static('Public'))

const allowedOrigins = [
  "https://interiitgodown.netlify.app",
  "http://localhost:5173",
   "http://localhost:3000"
  
];

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, AuthorizationRef");

  next();
});

 

/// routes 
import userRouter from './routes/user.routes.js';

import subsRouter from './routes/subscription.routes.js';
import tweetRouter from './routes/tweet.routes.js';
import videoRouter from './routes/video.routes.js';
import likeRouter from './routes/like.routes.js';
import commentRouter from './routes/comment.routes.js';
import playlistRouter from './routes/playlist.routes.js';
import itemRouter from './routes/item.routes.js';
import godownRouter from './routes/godown.routes.js';
////routes declarations
app.use('/api/v1/users', userRouter);
app.use("/api/v1/subscriptions",subsRouter);
app.use('/api/v1/tweets', tweetRouter);
app.use('/api/v1/videos', videoRouter);
app.use('/api/v1/likes',likeRouter)
app.use('/api/v1/comments',commentRouter)
app.use('/api/v1/playlists',playlistRouter)
app.use('/api/v1/item',itemRouter)
app.use('/api/v1/godown',godownRouter);
app.use(errorHandler)
export {app}

