import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const database = process.env.DATABASE_URL
mongoose.connect(database, { useNewUrlParser: true }); //check 

const db = mongoose.connection;

export const dbConnect = () => {
  db.on('error',  (err) => {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
  });

  db.once('open', () => {
      console.log('Successfully Connected to [ ' + db.name + ' ]');
  });
}