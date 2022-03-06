import React from 'react';

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
import { useSelector } from 'react-redux';

ChartJS.register(
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   Tooltip,
   Legend
);

export function Linechart() {
   const { chart } = useSelector(state => state.dashboardArticles)
   const labels = chart.months
   const views = []

   chart.viewsHistory.forEach(v => {
      views.push(v.views)
   })


   const options = {
      responsive: true,
      plugins: {
         legend: {
            position: 'top',
         },
         title: {
            display: true,
            text: 'Viewers',
         },
      },
      scales: {
         x: {
            grid: {
               display: false
            }
         },
         y: {
            grid: {
               display: true,
               borderColor: '#dadada',
               borderDashOffset: 400
            },
            ticks: {
               suggestedMin: 0,
               precision: 0,
            }
         },
      }
   };

   // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

   const data = {
      labels,
      datasets: [
         {
            label: 'Viewers',
            data: views,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
         },
      ],
   };

   // const { viewsHistory } = useSelector(state => state.dashboardArticles)

   return <Bar options={options} data={data} />;
}
