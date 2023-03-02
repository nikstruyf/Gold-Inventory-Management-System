import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { TransactionType } from '../../interfaces/TransactionData';

export default function DoughnutChartSoldType(
  props: {chartData: TransactionType | object, title: string}
) {
  const { chartData, title }: { chartData: TransactionType | object, title: string } = props;

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  );

  // const key = Object.keys(chartData);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const
      },
      title: {
        display: true,
        text: title
      }
    }
  };

  const data = {
    labels: Object.keys(chartData),
    datasets: [
      {
        label: 'Count ',
        data: Object.values(chartData),
        backgroundColor: [
          '#B93030 ',
          '#6B4C9A',
          '#1F77B4',
          '#FF7F0E',
          '#2CA02C',
          '#D62728',
          '#9467BD',
          '#8C564B',
          '#E377C2',
          '#7F7F7F',
          '#BCBD22',
          '#17BECF',
          '#FDBF6F',
          '#9EDAE5',
          '#F7B6D2',
          '#C7C7C7',
          '#AEC7E8',
          '#FFBB78',
          '#98DF8A',
          '#FF9896',
        ],
      },
    ],
  };

  return (
    <Doughnut options={options} data={data} />
  );
}
