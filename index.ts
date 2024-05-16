import express from 'express';
const app = express();
import sequelize from './init/sequelize';
import bodyParser from 'body-parser';
// routers for User

import userRouter from './routes/user/user.routes';
import secret_key from './middlewares/jwt/secret_key';

// allows to read the body of the request
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// generate secret key

secret_key.generateSecretKey();

// routes for user

app.use('/user', userRouter);

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