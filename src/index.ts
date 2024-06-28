import cors from 'cors';
import express from 'express';
import cookies from 'cookie-parser';
import { PrismaClient } from '@prisma/client';
import { config } from './config';
import { authRouter } from './api/auth/auth.routes';
import { userRouter } from './api/users/user.routes';
import { taskRouter } from './api/tasks/task.routes';
import { sendMiddleware } from './middlewares/send.middleware';
import { errorMiddleware } from './middlewares/error.middleware';

const app = express();
const PORT = config.get('PORT');

app.use(cors());
app.use(cookies());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(sendMiddleware);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tasks', taskRouter);

app.use(errorMiddleware);

(async () => {
  try {
    const prisma = new PrismaClient();

    await prisma.$connect();
    await prisma.$disconnect();

    app.listen(PORT, () => {
      console.log('Listening on port:', PORT);
    });
  } catch (e) {
    if (e instanceof Error) console.error(e.message);
    process.exit(1);
  }
})();
