import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { errorHandler } from './middlewares/error.middleware.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, './Public')));

// CORS Configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'https://interiitgodown.netlify.app', // Ensure correct spelling
    credentials: true, // Ensure correct spelling and enable credentials (cookies, etc.)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization', 'AuthorizationRef'] // Specify allowed headers
}));

app.use(cookieParser());
app.use(express.json({ limit: "16kb" })); // For parsing JSON data
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // For parsing URL-encoded data

// Routes setup
import userRouter from './routes/user.routes.js';
import subsRouter from './routes/subscription.routes.js';
import tweetRouter from './routes/tweet.routes.js';
import videoRouter from './routes/video.routes.js';
import likeRouter from './routes/like.routes.js';
import commentRouter from './routes/comment.routes.js';
import playlistRouter from './routes/playlist.routes.js';
import itemRouter from './routes/item.routes.js';
import godownRouter from './routes/godown.routes.js';

// Declare routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subsRouter);
app.use('/api/v1/tweets', tweetRouter);
app.use('/api/v1/videos', videoRouter);
app.use('/api/v1/likes', likeRouter);
app.use('/api/v1/comments', commentRouter);
app.use('/api/v1/playlists', playlistRouter);
app.use('/api/v1/item', itemRouter);
app.use('/api/v1/godown', godownRouter);

// Error handling middleware
app.use(errorHandler);

export { app };
