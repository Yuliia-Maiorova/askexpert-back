import express from 'express';
import cors from 'cors';
import sequelize from './init/sequelize';
import bodyParser from 'body-parser';
import secret_key from './middlewares/jwt/secret_key';

// routers
import userRouter from './routes/user/user.routes';
import answerRouter from './routes/answer/answer.router'
import questionRouter from './routes/question/question.router';
import categoryRouter from './routes/category/category.router'

const app = express();

// allows to read the body of the request
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// generate secret key

secret_key.generateSecretKey();

// Enable CORS
app.use(cors());

// routes for user

app.use('/user', userRouter);
app.use('/question', questionRouter);
app.use('/answer', answerRouter)
app.use('/category', categoryRouter)

// a default route to prevent the server from crashing
app.use('*', (req, res) => {
    res.status(404).send({error: "Request not found"});
});

// sync the database
sequelize.sync().then(() => {
    console.log('Database synced');
    // Start the server
    const PORT = 3000;
    // start the server at PORT
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
});