import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface TRLData {
  title: string;
  trl: number;
}

interface TRLChartProps {
  data: TRLData[];
}

export function TRLChart({ data }: TRLChartProps) {
  // Group data by TRL level
  const trlCounts = Array.from({ length: 9 }, (_, i) => {
    const trlLevel = i + 1;
    return data.filter(item => item.trl === trlLevel).length;
  });

  const chartData = {
    labels: Array.from({ length: 9 }, (_, i) => `TRL ${i + 1}`),
    datasets: [
      {
        label: 'Number of Technologies',
        data: trlCounts,
        backgroundColor: [
          'hsl(214, 100%, 75%)',
          'hsl(214, 100%, 70%)',
          'hsl(214, 100%, 65%)',
          'hsl(214, 100%, 60%)',
          'hsl(214, 100%, 55%)',
          'hsl(214, 100%, 50%)',
          'hsl(214, 100%, 45%)',
          'hsl(214, 100%, 40%)',
          'hsl(214, 100%, 35%)',
        ],
        borderColor: 'hsl(214, 100%, 27%)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'hsl(0, 0%, 100%)',
        titleColor: 'hsl(0, 0%, 3.9%)',
        bodyColor: 'hsl(0, 0%, 3.9%)',
        borderColor: 'hsl(0, 0%, 89.8%)',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          color: 'hsl(0, 0%, 90%)',
        },
        ticks: {
          color: 'hsl(0, 0%, 45.1%)',
          font: {
            size: 11,
          },
        },
      },
      y: {
        grid: {
          color: 'hsl(0, 0%, 90%)',
        },
        ticks: {
          color: 'hsl(0, 0%, 45.1%)',
          font: {
            size: 11,
          },
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ height: '300px' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
}