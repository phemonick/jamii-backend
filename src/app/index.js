  
import dotenv from 'dotenv';
import app from './app';

dotenv.config();
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3030;

app.listen(port, () => {
  console.log(`Server running on port ${port}`); // eslint-disable-line
});