import { Line } from 'react-chartjs-2';
import { BoxContainer } from '../../GlobalStyles';

interface CalorieIntakeChartProps {
  title: 'calorie' | 'fat' | 'carbohydrate' | 'protein' | 'weight';
  data: number[];
  labels: string[];
  dottedData?: number[];
}

export const CalorieIntakeChart = ({
  title,
  data,
  labels,
  dottedData
}: CalorieIntakeChartProps) => {
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
        cubicInterpolationMode: 'monotone' as const,
        borderDash: []
      }
    ]
  };

  if (dottedData) {
    lineData.datasets.push({
      data: dottedData,
      pointRadius: 0,
      pointHoverRadius: 0,
      pointBorderColor: '#000',
      pointStyle: 'circle',
      borderWidth: 2,
      hitRadius: 0,
      pointBackgroundColor: 'transparent',
      fill: false,
      borderColor: 'black',
      backgroundColor: 'black',
      cubicInterpolationMode: 'monotone' as const,
      borderDash: [20, 15]
    });
  }

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
        Last {data.length} {title} {title !== 'weight' ? 'intakes' : 'measurements (kg)'}
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
            At least 2 intakes are required to display a chart
          </div>
        )}
      </div>
    </BoxContainer>
  );
};
