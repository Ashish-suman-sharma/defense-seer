import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface TechRadarData {
  title: string;
  category: string;
  relevance: number;
}

interface TechRadarChartProps {
  data: TechRadarData[];
}

export function TechRadarChart({ data }: TechRadarChartProps) {
  const chartData = {
    labels: data.map(item => item.title),
    datasets: [
      {
        label: 'Technology Relevance',
        data: data.map(item => item.relevance),
        backgroundColor: 'hsl(214, 100%, 27%, 0.2)',
        borderColor: 'hsl(214, 100%, 27%)',
        borderWidth: 2,
        pointBackgroundColor: 'hsl(214, 100%, 27%)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'hsl(214, 100%, 27%)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'hsl(0, 0%, 45.1%)',
          font: {
            size: 12,
          },
        },
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
      r: {
        angleLines: {
          color: 'hsl(0, 0%, 90%)',
        },
        grid: {
          color: 'hsl(0, 0%, 90%)',
        },
        pointLabels: {
          color: 'hsl(0, 0%, 45.1%)',
          font: {
            size: 11,
          },
        },
        ticks: {
          color: 'hsl(0, 0%, 45.1%)',
          backdropColor: 'transparent',
          font: {
            size: 10,
          },
        },
        min: 0,
        max: 100,
      },
    },
  };

  return (
    <div style={{ height: '400px' }}>
      <Radar data={chartData} options={options} />
    </div>
  );
}