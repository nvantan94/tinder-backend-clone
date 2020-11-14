import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors';

import Cards from './dbCards.js'

const app = express();
const port = process.env.PORT || 8001;
const mongodb_password = process.env.MONGODB_PASSWORD

const connection_url = `mongodb+srv://admin:${mongodb_password}@cluster0.jvazg.mongodb.net/tinderdb?retryWrites=true&w=majority`

app.use(express.json());
app.use(cors());

mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})

app.get('/', (req, res) => {
  res.status(200).send('WELCOME TO TINDER BACKEND APIS!!!');
});

app.post('/tinder/cards', (req, res) => {
  const dbCard = req.body;

  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(201).send(data)
    }
  })
});

app.get('/tinder/cards', (req, res) => {
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).send(data)
    }
  })
})

app.listen(port, () => console.log(`listening on localhost: ${port}`))