import React, { useState, useEffect } from 'react';
import Chart from '../../chart/chart';
import Button from '@mui/material/Button';
import styles from './clientDashboard.module.css';
import StatisticTable from './statisticTable/statisticTable';
import Export from './export/export';

export default function ClientDashboard() {
  const [activeTab, setActiveTab] = useState('statistics');

  useEffect(() => {
    const savedTab = localStorage.getItem('activeTab');
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    localStorage.setItem('activeTab', tab);
  };

  return (
    <div>
      <div className={styles.clientContainer}>
        <div className={styles.buttonContainer}>
          <Button
            className={`${styles.button} ${activeTab === 'statistics' ? styles.active : ''}`}
            variant="text"
            color="primary"
            onClick={() => handleTabClick('statistics')}
          >
            Статистика
          </Button>
          <Button
            className={`${styles.button} ${activeTab === 'offers' ? styles.active : ''}`}
            variant="text"
            color="primary"
            onClick={() => handleTabClick('offers')}
          >
            Офферы
          </Button>
          <Button
            className={`${styles.button} ${activeTab === 'export' ? styles.active : ''}`}
            variant="text"
            color="primary"
            onClick={() => handleTabClick('export')}
          >
            Экспорт
          </Button>
        </div>
      </div>
      <div>
        {activeTab === 'statistics' && <div className={styles.chartWrapper}><Chart /></div>}
        {activeTab === 'offers' && <StatisticTable />}
        {activeTab === 'export' && <Export />}
      </div>
    </div>
  );
}
