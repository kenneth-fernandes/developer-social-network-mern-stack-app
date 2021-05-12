import express from 'express';
import { connectDB } from './config/db.js';
import { usersRouter } from './routes/api/users.js';
import { postsRouter } from './routes/api/posts.js';
import { profileRouter } from './routes/api/profile.js';
import { authRouter } from './routes/api/auth.js';
import path from 'path';

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ limit: '30mb', extended: false }));

// Define routes
app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);
app.use('/api/profile', profileRouter);
app.use('/api/auth', authRouter);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
