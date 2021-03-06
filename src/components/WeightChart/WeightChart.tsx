import { Line } from 'react-chartjs-2';
import { useRecoilValue } from 'recoil';
import { BoxContainer } from '../../GlobalStyles';
import { themeState } from '../../store/atoms/themeAtoms';

interface ChartProps {
  data: number[];
  labels: string[];
}

export const WeightChart = ({ data, labels }: ChartProps) => {
  const { mode: _mode, color: _color } = useRecoilValue(themeState);
  const mode = _mode.split('-')[2];
  const color = _color.split('-')[2];

  const lineData = {
    labels,
    datasets: [
      {
        data,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointBorderColor: mode === 'dark' ? 'white' : 'black',
        pointStyle: 'circle',
        borderWidth: 2,
        hitRadius: 20,
        pointBackgroundColor: 'transparent',
        fill: false,
        borderColor: color,
        backgroundColor: mode === 'dark' ? 'white' : 'black',
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
          color: mode === 'dark' ? 'white' : 'black'
        }
      },
      x: {
        grid: {
          color: 'transparent'
        },
        ticks: {
          color: mode === 'dark' ? 'white' : 'black'
        }
      }
    }
  };

  return (
    <BoxContainer fullwidth={false}>
      <div style={{ fontSize: '0.825rem', margin: '1rem 0' }}>
        Last {data.length} measurements (descending order)
      </div>
      <div style={{ width: '100%', height: '14rem' }}>
        {lineData.labels.length > 1 ? (
          <Line data={lineData} options={options} />
        ) : (
          <div
            style={{
              display: 'flex',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            At least 2 measurements are required to display a chart
          </div>
        )}
      </div>
    </BoxContainer>
  );
};
