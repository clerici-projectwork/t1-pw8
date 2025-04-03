import 'dotenv/config';
import express from 'express';
import historicalPageApi from './routes/historical-page';
import kpiPageApi from './routes/kpi-page';
import realTimePageApi from './routes/real-time-page';
import cors from 'cors';

const expressApp = express();

expressApp.use(cors({ origin: 'http://localhost:5173' }));

// All APIs will have the '/api/ prefix
expressApp.use('/api', kpiPageApi);
expressApp.use('/api', historicalPageApi);
expressApp.use('/api', realTimePageApi);

expressApp.listen(3000, () => {
  console.log('express server listening on port 3000');
});
