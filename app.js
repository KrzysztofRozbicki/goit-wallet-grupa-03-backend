import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

const app = express();
const logger = morgan;

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use(express.static('public'));

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

export const startServer = async () => {
  try {
    app.listen(3000);
  } catch (err) {
    console.error(err);
  }
};
startServer();
