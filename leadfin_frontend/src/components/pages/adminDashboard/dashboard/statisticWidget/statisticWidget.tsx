import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import styles from './statisticWidget.module.css';

interface StatisticWidgetProps {
  title: string;
  value: number;
  subtitle: string;
}

export const StatisticWidget: React.FC<StatisticWidgetProps> = ({ title, value, subtitle }) => {
  return (
    <Card variant="outlined" className={styles.widget}>
      <CardContent>
        <Typography variant="caption" className={styles.widgetTitle}>{title}</Typography>
        <Typography variant="h4" className={styles.widgetValue}>{value}</Typography>
        <Typography variant="caption" className={styles.widgetSubtitle}>{subtitle}</Typography>
      </CardContent>
    </Card>
  );
};
