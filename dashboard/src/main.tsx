import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { RealTimeDataRoute } from './routes/real-time-data/real-time-data';
import { HistoricalDataRoute } from './routes/historical-data/historical-data';
import { KpiDataRoute } from './routes/kpi-data/kpi-data';
import { Topbar } from './components/layout/topbar/topbar';
import { ROUTES } from './common/constants';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <div className='flex flex-col w-dvw min-h-dvh'>
        <Topbar />
        <main className='bg-blue-500/10 grow'>
          <div className='max-w-7xl mx-auto px-4 py-10 md:px-10'>
            <Routes>
              <Route index={true} path='/' element={<Navigate replace={true} to={ROUTES.REAL_TIME_DATA} />} />
              <Route path={ROUTES.REAL_TIME_DATA} element={<RealTimeDataRoute />} />
              <Route path={ROUTES.HISTORICAL_DATA} element={<HistoricalDataRoute />} />
              <Route path={ROUTES.KPI_DATA} element={<KpiDataRoute />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  </StrictMode>
);
