import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { BoxContainer } from '../../GlobalStyles';

Chart.register(...registerables);

interface ChartProps {
  data: number[];
  labels: string[];
}

export const WeightChart = ({ data, labels }: ChartProps) => {
  const lineData = {
    labels,
    datasets: [
      {
        data,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointBorderColor: '#000',
        pointStyle: 'circle',
        borderWidth: 2,
        hitRadius: 20,
        pointBackgroundColor: 'transparent',
        fill: false,
        borderColor: '#349eff',
        backgroundColor: 'black',
        cubicInterpolationMode: 'monotone' as const
      }
    ]
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        displayColors: false,
        position: 'nearest' as const,
        yAlign: 'bottom' as const,
        xAlign: 'center' as const,
        callbacks: {
          label: ({ dataIndex }: { dataIndex: number }) =>
            lineData.datasets[0].data[dataIndex].toString(),
          title: () => ''
        }
      }
    },
    scales: {
      y: {
        suggestedMax: 200,
        suggestedMin: 40,
        grid: {
          color: 'transparent'
        },
        ticks: {
          color: 'black'
        }
      },
      x: {
        grid: {
          color: 'transparent'
        },
        ticks: {
          color: 'black'
        }
      }
    }
  };

  return (
    <BoxContainer fullwidth={false}>
      <div style={{ fontSize: '0.825rem', margin: '1rem 0' }}>
        Last 7 measurements (descending order)
      </div>
      <div style={{ width: '100%', height: '14rem' }}>
        <Line data={lineData} options={options} />
      </div>
    </BoxContainer>
  );
};