import 'dotenv/config';
import express from 'express';
import './utils/connection';
const app = express();
import cors from 'cors';
import routes from './routes';
const PORT = process.env.PORT || 3001;
import { json, text, urlencoded } from 'body-parser';

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(text());

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-Auth-Token, Content-Type, Authorization, Accept");
//     res.header("Access-Control-Allow-Methods", "*");
//     next();
// });
app.use(cors());

app.use(routes);

app.listen(PORT, () => {
    console.log(`API Server now listening on PORT ${PORT}`);
});
