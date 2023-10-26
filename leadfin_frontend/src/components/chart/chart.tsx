import React from "react";
import { addDays, subDays, format } from 'date-fns';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import styles from "./chart.module.css";

function generateDataForLast30Days() {
  const today = new Date();
  const data = [];

  for (let i = 0; i < 30; i++) {
    const date = subDays(today, i);
    const clicks = Math.floor(Math.random() * 1000);
    data.unshift({ date, clicks });
  }

  return data;
}

export default function Chart() {
  const data = generateDataForLast30Days();

  return (
    <div className={styles.chartContainer}>
      <h2 className={styles.chartTitle}>
        Статистика по трафику за последние 30 дней
      </h2>
      <div className={styles.chart}>
        <LineChart
          width={1100}
          height={300}
          data={data}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(date) => format(date, 'dd MMM')}
          />
          <YAxis
            tick={false}
            domain={['auto', 'auto']}
          />
          <Tooltip
            labelFormatter={(label) => format(label, 'dd MMM')}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="clicks"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </div>
    </div>
  );
}
