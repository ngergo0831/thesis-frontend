import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

import { RecoilRoot } from 'recoil';
import { Chart, registerables } from 'chart.js';
import { LayoutSwitch } from './layouts/LayoutSwitch';

import './assets/boxicons-2.0.7/css/boxicons.min.css';
import './assets/css/index.css';
import './assets/css/grid.css';
import './assets/css/theme.css';
import { CircularProgress } from '@mui/material';

document.title = 'Conscious Nutrition';
Chart.register(...registerables);

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <Suspense fallback={<CircularProgress />}>
        <LayoutSwitch />
      </Suspense>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);
