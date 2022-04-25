import { Intake } from '../../types/types';
import { Doughnut } from 'react-chartjs-2';

interface DoughnutChartProps {
  data: Intake;
}

const options = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true
    },
    tooltip: {
      displayColors: false
    }
  }
};

export const DoughnutChart = ({ data }: DoughnutChartProps) => {
  const chartData = {
    labels: ['Protein', 'Carbs', 'Fat'],
    datasets: [
      {
        label: 'Intake',
        data: [data.protein, data.carbs, data.fat],
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
        hoverOffset: 4
      }
    ]
  };

  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', minHeight: '300px', minWidth: '300px' }}
    >
      <Doughnut data={chartData} options={options} />
    </div>
  );
};
