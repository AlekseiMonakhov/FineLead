import React from 'react';
import { Card, CardContent, Container, Grid } from '@mui/material';
import styles from './dashboard.module.css';
import { ListWidget } from './listWidget/listWidget';
import { StatisticWidget } from './statisticWidget/statisticWidget';

export default function Dashboard() {
  return (
    <Container className={styles.container}>
      <Grid container spacing={3}>

        <Grid item xs={4}>
          <StatisticWidget title="Клики" value={660} subtitle="За сегодня" />
        </Grid>
        <Grid item xs={4}>
          <StatisticWidget title="Конверсии" value={69} subtitle="За сегодня" />
        </Grid>
        <Grid item xs={4}>
          <StatisticWidget title="Прибыль" value={2040} subtitle="За сегодня" />
        </Grid>

        <Grid item xs={6}>
          <ListWidget title="Топ партнеров по офферам" items={[{ name: "Viva Events", value: "1,000.00 RUB" }]} />
        </Grid>

        <Grid item xs={6}>
          <Card variant="outlined">
            <CardContent className={styles['chart-placeholder']}>
              Заглушка для графика
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={3}>
          <StatisticWidget title="Партнеры в статусе 'Active'" value={2} subtitle="За две недели" />
        </Grid>
        
        <Grid item xs={3}>
          <StatisticWidget title="Офферы в статусе 'Active'" value={14} subtitle="" />
        </Grid>

      </Grid>
    </Container>
  );
}
