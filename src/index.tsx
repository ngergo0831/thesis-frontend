import React from 'react';
import ReactDOM from 'react-dom';

import Layout from './layouts/Layout';

import './assets/boxicons-2.0.7/css/boxicons.min.css';
import './assets/css/index.css';
import './assets/css/grid.css';
import './assets/css/theme.css';
import { RecoilRoot } from 'recoil';

import { Chart, registerables } from 'chart.js';

document.title = 'WIP';
Chart.register(...registerables);

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <Layout />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);
