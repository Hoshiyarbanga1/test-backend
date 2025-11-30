

import express from 'express';
import cors from 'cors';
import sequelize from "./db/sequelize";
import routes from './routes/index.routes';


const app = express();
const PORT = process.env.PORT || 3500;

app.use(cors());
app.use(express.json());

sequelize
  .authenticate()
  .then(() => console.log("MySQL Connected Successfully!"))
  .catch((err) => console.error("MySQL Connection Error:", err));


app.use('/api', routes);


app.get('/', (req, res) => {
  res.send('Hello, TypeScript + Node.js MVC 11🚀');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
